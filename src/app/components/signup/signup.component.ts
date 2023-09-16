import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.signUpForm = this.formBuilder.group({
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
    });
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
