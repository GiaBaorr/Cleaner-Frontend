import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global-constant';

@Component({
  selector: 'app-hiring-worker',
  templateUrl: './hiring-worker.component.html',
  styleUrls: ['./hiring-worker.component.scss'],
})
export class HiringWorkerComponent implements OnInit {
  workerId?: number;
  hireForm: any = FormGroup;

  //
  constructor(
    public dialogRef: MatDialogRef<HiringWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.workerId = this.data.workerId;

    this.hireForm = this.formBuilder.group({
      guestEmail: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      guestName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      guestPhone: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      guestAddress: [null, [Validators.required]],
    });
  }
  handleSubmitHire() {}
}
