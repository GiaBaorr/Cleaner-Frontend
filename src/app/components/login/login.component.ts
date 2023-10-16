import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global-constant';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('email')) {
      console.log('Email');
    }
  }

  handleSubmitLogin() {
    this.ngxService.start();

    var formData = this.loginForm.value;
    var data = {
      Email: formData.email,
      Password: formData.password,
    };

    this.accountService.login(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', res.token);
        this.router.navigate(['']);
        this.toast.success('Hello, ' + res.name);
        this.accountService.isLoggedIn.next(true);
      },
      (err: any) => {
        this.ngxService.stop();
        if (err.status === 400) {
          if (err.errors.Email) {
            this.toast.warning(
              'Please enter all required fields',
              'Field Requirement'
            );
          }
          if (err.errors.Password) {
            this.toast.warning(
              'Please enter all required fields',
              'Field Requirement'
            );
          }
        } else {
          this.toast.error('Your account is not exist', 'Invalid data');
        }
        this.accountService.isLoggedIn.next(false);
      }
    );
  }
}
