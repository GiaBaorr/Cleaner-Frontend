import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HouseholdChore } from 'src/app/common/household-chore';
import { Worker } from 'src/app/common/worker';
import { GlobalConstants } from 'src/app/global-constant';
import { HouseholdChoresService } from 'src/app/services/household-chores.service';
import { WorkerServiceService } from 'src/app/services/worker-service.service';

@Component({
  selector: 'app-update-worker-dialog',
  templateUrl: './update-worker-dialog.component.html',
  styleUrls: ['./update-worker-dialog.component.scss'],
})
export class UpdateWorkerDialogComponent implements OnInit {
  worker?: Worker;
  chores?: HouseholdChore[];
  updateWorkerForm: any = FormGroup;
  choresExistId?: number[] = [];
  hasUpdateClicked?: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateWorkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private workerService: WorkerServiceService,
    private choresService: HouseholdChoresService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.worker = this.data.worker;
    this.worker?.chores?.forEach((ch) => {
      this.choresExistId?.push(ch.id!);
    });

    this.choresService.getAllChores().subscribe((data) => {
      this.chores = data;
    });

    this.updateWorkerForm = this.formBuilder.group({
      id: [this.worker?.id],
      name: [this.worker?.name, [Validators.required]],
      fee: [this.worker?.fee, Validators.required],
      address: [this.worker?.address, Validators.required],
    });

    this.updateWorkerForm.get('id')?.disable();
  }

  handleSubmitUpdate() {
    let formValue = this.updateWorkerForm.value;
    this.hasUpdateClicked = true;

    let data = {
      id: this.worker?.id,
      name: formValue.name,
      fee: formValue.fee,
      address: formValue.address,
      chores: this.choresExistId,
      version: this.worker?.version,
    };

    this.workerService.updateWorkerData(data).subscribe(
      () => {
        this.toast.success('Update successfully.');
        this.dialogRef.close(this.hasUpdateClicked);
      },
      () => {
        this.toast.error('Update failed, please try again');
        this.toast.info('New data just has updated.');
        this.dialogRef.close(this.hasUpdateClicked);
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

  close() {
    this.dialogRef.close(this.hasUpdateClicked);
  }
}
