import {
  Component,
  Output,
  EventEmitter,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global-constant';
import jwt_decode from 'jwt-decode';
import { WorkerServiceService } from 'src/app/services/worker-service.service';

@Component({
  selector: 'app-hiring-worker',
  templateUrl: './hiring-worker.component.html',
  styleUrls: ['./hiring-worker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HiringWorkerComponent implements OnInit {
  workerId?: number;
  hireForm: any = FormGroup;
  isLoggedIn: boolean = false;

  //
  constructor(
    public dialogRef: MatDialogRef<HiringWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    private workerService: WorkerServiceService
  ) {}

  ngOnInit(): void {
    this.workerId = this.data.workerId;
    var token = localStorage.getItem('token');
    if (token) {
      var tokenPayload: any = jwt_decode(token!);
      if (token && tokenPayload?.email && tokenPayload?.userId) {
        this.isLoggedIn = true;
      }
    }

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

  handleSubmitHire() {
    if (this.isLoggedIn) {
      var data1 = {
        WorkerId: this.workerId,
      };
      this.hireWorkerAPIHandle(data1);
    } else {
      var formData = this.hireForm.value;
      var data2 = {
        GuestAddress: formData.guestAddress,
        GuestName: formData.guestName,
        GuestPhone: formData.guestPhone,
        GuestEmail: formData.guestEmail,
        WorkerId: this.workerId,
      };
      this.hireWorkerAPIHandle(data2);
    }
  }

  hireWorkerAPIHandle(data: any) {
    this.ngxService.start();
    this.workerService.hireWorkerWithData(data).subscribe(
      (res) => {
        this.ngxService.stop();
        this.toast.info(
          'Your hiring order has been submitted, please check your mail.'
        );
        this.dialogRef.close();
      },
      (err) => {
        this.ngxService.stop();
        this.toast.error('Error');
      }
    );
  }
}
