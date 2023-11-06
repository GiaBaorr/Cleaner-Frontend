import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import jwt_decode from 'jwt-decode';
import { Worker } from 'src/app/common/worker';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseholdChore } from 'src/app/common/household-chore';
import { HouseholdChoresService } from 'src/app/services/household-chores.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-worker-order',
  templateUrl: './worker-order.component.html',
  styleUrls: ['./worker-order.component.scss'],
})
export class WorkerOrderComponent implements OnInit {
  orders: Order[] = [];
  currentWorker?: Worker;
  workerUpdateForm: any = FormGroup;
  chores?: HouseholdChore[];
  choresExistId?: number[] = [];

  constructor(
    private orderService: OrderService,
    private workerService: WorkerServiceService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private choresService: HouseholdChoresService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.workerUpdateForm = this.formBuilder.group({
      fee: [null, Validators.required],
    });

    this.listOrders();
    this.fetchWorker();
    this.fetchChoresList();
  }

  fetchChoresList() {
    this.choresService.getAllChores().subscribe((data) => {
      this.chores = data;
    });
  }

  fetchWorker(): void {
    this.workerService.getWorkerDetailFromWorker().subscribe((data: Worker) => {
      this.currentWorker = data;
      this.currentWorker.chores?.forEach((c) => {
        this.choresExistId?.push(c.id!);
      });
      this.workerUpdateForm.controls['fee'].setValue(this.currentWorker.fee);
    });
  }
  listOrders() {
    this.orderService.getOrderHistoryFromWorker().subscribe((data) => {
      this.orders = data;
      this.orders.forEach((element) => {
        element.dateString = element.date?.toString().split(' ')[0];
      });
    });
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

  onSubmitUpdateWorker() {
    let formValue = this.workerUpdateForm.value;

    let data = {
      ChoresList: this.choresExistId,
      Fee: formValue.fee,
    };

    this.workerService.workerUpdateInfo(data).subscribe(() => {
      this.toastrService.info('Your update request has been sent');
    });
  }

  //handel action on order
  onRejectOrder(orderId: any) {
    this.workerService.rejectOrderFromWorker(orderId).subscribe(
      () => {
        this.toastrService.info('Order rejected');
        this.listOrders();
        this.fetchWorker();
      },
      (err) => {
        console.log(err);
        this.listOrders();
        this.fetchWorker();
      }
    );
  }
  onApproveOrder(orderId: any) {
    this.workerService.approveOrFinishOrder(orderId).subscribe(
      (res) => {
        this.toastrService.success('Order approved');
        this.listOrders();
        this.fetchWorker();
      },
      (err) => {
        console.log(err);
        this.listOrders();
        this.fetchWorker();
      }
    );
  }
  onFinishOrder(orderId: any) {
    this.workerService.approveOrFinishOrder(orderId).subscribe(
      (res) => {
        this.toastrService.success('Order finished');
        this.listOrders();
        this.fetchWorker();
      },
      (err) => {
        console.log(err);
        this.listOrders();
        this.fetchWorker();
      }
    );
  }
  //change working state
  onChangeWorkingState(event: any) {
    if (event.value === this.currentWorker?.workingState) {
      return;
    }

    this.workerService.changeWorkingStateFromWorker().subscribe(
      () => {
        this.fetchWorker();
        this.toastrService.success(
          'Working state : ' + this.currentWorker?.workingState
        );
      },
      () => {
        this.toastrService.error('Error');
      }
    );
  }
  // update info

  selectedFile?: any;
  previewSrc: any;

  uploadFiles() {
    if (
      this.previewSrc === undefined ||
      this.previewSrc === null ||
      this.previewSrc.length === 0
    ) {
      return;
    }

    let base64 = this.previewSrc.split('base64,')[1];

    let imageName = this.currentWorker?.name + '.png';
    let imageBlob = this.dataURItoBlob(base64);
    let imageFile = new File([imageBlob], imageName, { type: 'image' });

    this.ngxService.start();
    this.workerService.workerUploadPhoto(imageFile).subscribe(
      () => {
        this.ngxService.stop();
        this.toastrService.info('Updated, please wait for approval');
        this.fetchWorker();
      },
      () => {
        this.ngxService.stop();
        this.toastrService.error('Unknown error, please try again');
      }
    );
  }
  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  selectFiles(event: any) {
    if (event.target?.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.previewSrc = reader.result);

      reader.readAsDataURL(this.selectedFile);
    }
  }
}
