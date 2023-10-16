import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/global-constant';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  signUpForm: any = FormGroup;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    //set up form
    this.signUpForm = this.formBuilder.group(
      {
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
        password2: [null, [Validators.required]],
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
      },
      {
        validator: this.ConfirmedValidator(),
      }
    );
  }

  ConfirmedValidator() {
    return (formGroup: FormGroup) => {
      const password1 = formGroup.controls['password1'];
      const password2 = formGroup.controls['password2'];
      if (password2.errors && !password2.errors?.['confirmedValidator']) {
        return;
      }
      if (password1.value !== password2.value) {
        password2.setErrors({ confirmedValidator: true });
      } else {
        password2.setErrors(null);
      }
    };
  }

  validateSubmit() {
    if (
      this.signUpForm.controls['password1'].value !=
      this.signUpForm.controls['password2'].value
    ) {
      return false;
    }
    return true;
  }

  handleSubmitSignUp() {
    this.ngxService.start();

    if (!this.validateSubmit()) {
      this.toast.warning('Please enter a valid password');
      return;
    }

    var formData = this.signUpForm.value;

    var data = {
      Name: formData.fullName,
      Password: formData.password1,
      Email: formData.email,
      Phone: formData.phoneNumber,
      Address: formData.address,
    };

    this.accountService.signup(data).subscribe(
      (response: any) => {
        this.ngxService.stop();

        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
        this.toast.success('Hello, ' + response.name);
        this.accountService.isLoggedIn.next(true);
        this.dialogRef.close();
      },
      (error: any) => {
        this.ngxService.stop();

        this.toast.error(error.error);
        this.accountService.isLoggedIn.next(false);
        localStorage.removeItem('token');
      }
    );
  }
}
