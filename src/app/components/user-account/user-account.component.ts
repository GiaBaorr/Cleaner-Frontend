import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Account } from 'src/app/common/account';
import { GlobalConstants } from 'src/app/global-constant';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  //
  account?: Account;
  //
  updateAccountForm: any = FormGroup;
  changePasswordForm: any = FormGroup;
  //
  hide0: boolean = true;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.updateAccountForm = this.formBuilder.group({
      email: [{ value: null, disabled: true }, [Validators.required]],
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

    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: [null, [Validators.required]],
        newPassword1: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
          ],
        ],
        newPassword2: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
          ],
        ],
      },
      {
        validator: this.ConfirmedValidator(),
      }
    );

    this.accountService.getUserAccountByToken().subscribe(
      (data) => {
        this.account = data;
        this.updateAccountForm.controls['email'].setValue(this.account.email);
        this.updateAccountForm.controls['fullName'].setValue(this.account.name);
        this.updateAccountForm.controls['phoneNumber'].setValue(
          this.account.phone
        );
        this.updateAccountForm.controls['address'].setValue(
          this.account.address
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ConfirmedValidator() {
    return (formGroup: FormGroup) => {
      const newPassword1 = formGroup.controls['newPassword1'];
      const newPassword2 = formGroup.controls['newPassword2'];
      if (newPassword2.errors && !newPassword2.errors?.['confirmedValidator']) {
        return;
      }
      if (newPassword1.value !== newPassword2.value) {
        newPassword2.setErrors({ confirmedValidator: true });
      } else {
        newPassword2.setErrors(null);
      }
    };
  }
  validateSubmitChangePassword() {
    if (
      this.changePasswordForm.controls['newPassword1'].value !=
      this.changePasswordForm.controls['newPassword2'].value
    ) {
      return false;
    }
    return true;
  }

  onSubmitUpdateInfo() {
    let formValue = this.updateAccountForm.value;

    let data = {
      Name: formValue.fullName,
      Address: formValue.address,
      Phone: formValue.phoneNumber,
    };
    console.log(data);

    this.ngxService.start();
    this.accountService.updateAccountByUser(data).subscribe(
      () => {
        this.ngxService.stop();
        this.toastService.success('Your account has been updated');
        this.ngOnInit();
      },
      (error) => {
        this.ngxService.stop();
        this.toastService.error(error.error);
      }
    );
  }

  onChangePassword() {
    if (!this.validateSubmitChangePassword) {
      return;
    }
    let formValue = this.changePasswordForm.value;
    let data = {
      OldPassword: formValue.currentPassword,
      NewPassword: formValue.newPassword1,
      ConfirmNewPassword: formValue.newPassword2,
    };

    this.accountService.changePasswordByUser(data).subscribe(
      () => {
        this.toastService.success(
          'Your password has been changed successfully'
        );
        this.changePasswordForm.reset();
      },
      () => {
        this.toastService.error('Update password failed!');
      }
    );
  }
}
