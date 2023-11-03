import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { HouseholdChore } from 'src/app/common/household-chore';
import { AccountService } from 'src/app/services/account.service';
import { HouseholdChoresService } from 'src/app/services/household-chores.service';
import { WorkerServiceService } from 'src/app/services/worker-service.service';

@Component({
  selector: 'app-user-enroll',
  templateUrl: './user-enroll.component.html',
  styleUrls: ['./user-enroll.component.scss'],
})
export class UserEnrollComponent implements OnInit {
  enrollWorkerForm: any = FormGroup;
  chores?: HouseholdChore[];
  choresExistId?: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private choresService: HouseholdChoresService,
    private toastService: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.choresService.getAllChores().subscribe((data) => {
      this.chores = data;
    });

    this.enrollWorkerForm = this.formBuilder.group({
      fee: [null, Validators.required],
    });
  }
  onSubmitEnroll(): void {
    let formValue = this.enrollWorkerForm.value;

    let data = {
      choresList: this.choresExistId,
      fee: formValue.fee,
    };

    this.accountService.userEnrollWorker(data).subscribe(
      (data) => {
        console.log(data);

        this.toastService.success('Enroll succeeded');
        this.toastService.info(
          'Please login again to update your worker information.'
        );
      },
      (error) => {
        console.log(error);
        this.toastService.error(error.error);
        this.toastService.info('Please login again');
      }
    );
  }
  handleChangeChores(event: MatCheckboxChange) {
    //add
    if (
      event.checked &&
      this.choresExistId?.indexOf(+event.source.value) == -1
    ) {
      this.choresExistId?.push(+event.source.value);
    }
    //remove
    if (
      !event.checked &&
      this.choresExistId?.indexOf(+event.source.value) != -1
    ) {
      this.choresExistId = this.choresExistId?.filter(
        (item) => item != +event.source.value
      );
    }
  }
}
