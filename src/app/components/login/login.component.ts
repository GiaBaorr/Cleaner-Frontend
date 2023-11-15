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
  forgotPasswordForm: any = FormGroup;
  otpValue: string = '';
  otpButtonEnable: boolean = true;
  otpCountdown: number = 5;
  resetPasswordOTPCondition: boolean = false;

  hide: boolean = true;
  hideNewPassword: boolean = true;

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

    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      otp: [null],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
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
          this.toast.error('Your account data is not valid', 'Invalid data');
        }
        this.accountService.isLoggedIn.next(false);
      }
    );
  }

  onOtpChange(otp: any) {
    this.forgotPasswordForm.controls['otp'].value = otp;

    let value: string = this.forgotPasswordForm.controls['otp'].value;
    let matchRegex = value.match(/^\d{6}$/);

    if (value.length == 6 && matchRegex) {
      this.resetPasswordOTPCondition = true;
    } else {
      this.resetPasswordOTPCondition = false;
    }

    console.log(this.forgotPasswordForm.controls['otp'].value);
  }

  handleSendOTP(value: string) {
    console.log(value);
    this.otpButtonEnable = false;

    let data = '"' + value + '"';
    this.accountService.getOtpByUser(data).subscribe(
      () => {
        this.toast.success('Your OTP has been send successfully');
      },
      () => {
        this.toast.error('Your email does not exist');
      }
    );

    const countdownInterval = setInterval(() => {
      if (this.otpCountdown === 0) {
        clearInterval(countdownInterval); // Clear the interval when countdown reaches 0
      } else {
        this.otpCountdown -= 1; // Decrement the countdown value
      }
    }, 1000);

    setTimeout(() => {
      this.otpButtonEnable = true;
      this.otpCountdown = 5;
    }, 5000);
  }

  handleResetNewPassword() {
    let formData = this.forgotPasswordForm.value;

    let data = {
      Email: formData.email,
      OtpCode: this.forgotPasswordForm.controls['otp'].value,
      NewPassword: formData.newPassword,
    };

    console.log(data);

    this.ngxService.start();
    this.accountService.changePasswordByUserWithOtp(data).subscribe(
      () => {
        this.ngxService.stop();
        this.toast.success('Your password has been reset');
      },
      () => {
        this.ngxService.stop();
        this.toast.error('Please recheck your OTP code and your email');
      }
    );
  }
}
