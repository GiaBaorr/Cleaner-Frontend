import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GlobalConstants } from 'src/app/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: any = FormGroup;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
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
        fullName: [null, [Validators.required]],
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
      return true;
    } else {
      return false;
    }
  }

  handleSubmitSignUp() {}
}
