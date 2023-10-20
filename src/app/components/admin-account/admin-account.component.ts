import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Account } from 'src/app/common/account';
import { GlobalConstants } from 'src/app/global-constant';
import { AccountService } from 'src/app/services/account.service';
1;
@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminAccountComponent implements OnInit {
  //search handle
  previousKeyword: string = '';
  searchMode: boolean = false;
  //data
  accounts: Account[] = [];
  //pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalElements: number = 0;
  //form
  addAccountForm: any = FormGroup;
  hide1: boolean = true;
  //mat expansion element
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement!: MatExpansionPanel;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.addAccountForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password1: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
      fullName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      address: [null, [Validators.required]],
    });

    this.activatedRoute.queryParams.subscribe(() => {
      this.listAccounts();
    });
    this.listAccounts();
  }

  listAccounts() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchMode = param.has('keyword');
    });

    if (this.searchMode) {
      this.handleSearchMode();
    } else {
      this.handleListMode();
    }
  }

  handleListMode() {
    this.accountService
      .getAccountForAdminWithPagination(this.currentPage - 1)
      .subscribe(
        (data) => {
          this.accounts = data.list;
          this.currentPage = data.currentPage + 1;
          this.totalElements = +data.totalElements;
          this.pageSize = +data.pageSize;
        },
        (error) => {
          this.toast.error('Failed to get account list');
        }
      );
  }

  handleSearchMode() {
    let keyword: string = this.activatedRoute.snapshot.queryParamMap
      .get('keyword')!
      .trim();

    if (keyword != this.previousKeyword) {
      this.currentPage = 1;
    }
    this.previousKeyword = keyword;

    this.accountService
      .getAccountForAdminWitKeyword(keyword, this.currentPage - 1)
      .subscribe(
        (data) => {
          this.accounts = data.list;
          this.currentPage = data.currentPage + 1;
          this.totalElements = +data.totalElements;
          this.pageSize = +data.pageSize;
          //async
          if (this.accounts.length == 0) {
            this.toast.info('No account found');
          }
        },
        (error) => {
          this.toast.error('Failed to get account history');
        }
      );
  }

  onSubmitSearch(value: string): void {
    if (value === '' || value.length === 0) {
      this.router.navigate(['/admin/account']);
    } else {
      this.router.navigate(['/admin/account'], {
        queryParams: { keyword: value },
      });
    }
  }

  confirmDelete(account: Account) {
    if (account.role !== 'user') {
      this.toast.warning(
        'You are not allowed to delete worker or admin account'
      );
      return;
    }
    let result = window.confirm('Are you sure you want to delete this account');
    if (result) {
      this.accountService.deleteAccountUserRole(account.id!).subscribe(
        () => {
          this.toast.success('Account deleted successfully');
          this.listAccounts();
        },
        (error: any) => {
          this.toast.error(error.message);
        }
      );
    }
  }

  onClearForm() {
    this.addAccountForm.reset();
  }
  onCloseForm() {
    this.onClearForm();
    this.matExpansionPanelElement.close();
  }
  onSubmitAccount() {
    //ADD
    var formData = this.addAccountForm.value;

    var data = {
      Name: formData.fullName,
      Password: formData.password1,
      Email: formData.email,
      Phone: formData.phoneNumber,
      Address: formData.address,
    };
    this.ngxService.start();
    this.accountService.adminAddAccount(data).subscribe(
      () => {
        this.ngxService.stop();
        this.toast.success('Account added successfully');
        this.onCloseForm();
        this.listAccounts();
      },
      (error: HttpErrorResponse) => {
        this.ngxService.stop();
        this.toast.error(error.error.message);
      }
    );
  }
}
