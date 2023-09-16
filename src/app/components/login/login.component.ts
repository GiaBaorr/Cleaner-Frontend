import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

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

  handleSubmitLogin() {}
}
