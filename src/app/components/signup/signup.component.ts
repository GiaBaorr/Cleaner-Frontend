import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HouseholdChore } from 'src/app/common/household-chore';
import { GlobalConstants } from 'src/app/global-constant';
import { HouseholdChoresService } from 'src/app/services/household-chores.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: any = FormGroup;
  hide1: boolean = true;
  hide2: boolean = true;
  chores: HouseholdChore[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private householdChoresService: HouseholdChoresService
  ) {}

  ngOnInit(): void {
    //set up chores for rendering UI
    this.householdChoresService
      .getAllChores()
      .subscribe((data) => (this.chores = data));

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
        chores: this.formBuilder.array([]),
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

  handleAddChore(event: MatCheckboxChange) {
    let choresFormArray = this.signUpForm.controls['chores'] as FormArray;

    if (event.checked === true) {
      choresFormArray.push(new FormControl(event.source.value));
    } else {
      let i = 0;
      choresFormArray.controls.forEach((chore) => {
        if (chore.value === event.source.value) {
          choresFormArray.removeAt(i);
        }
        i++;
      });
    }
  }
}
