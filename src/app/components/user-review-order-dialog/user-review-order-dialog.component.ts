import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-review-order-dialog',
  templateUrl: './user-review-order-dialog.component.html',
  styleUrls: ['./user-review-order-dialog.component.scss'],
})
export class UserReviewOrderDialogComponent implements OnInit {
  order?: Order;
  reviewOrderForm: any = FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserReviewOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  //
  ngOnInit(): void {
    this.order = this.data.order;
    console.log(this.order);

    this.reviewOrderForm = this.formBuilder.group({
      orderId: [this.order?.id],
      reviewContent: [''],
      rate: [null, Validators.required],
    });
  }

  onSubmitReview() {
    let formValue = this.reviewOrderForm.value;

    let data = {
      orderId: formValue.orderId,
      reviewContent: formValue.reviewContent,
      rate: formValue.rate,
    };

    if (data.reviewContent == null) {
      data.reviewContent = '';
    }

    this.orderService.userReviewOrder(data).subscribe(
      () => {
        this.toastrService.success('Your review has been submitted');
        this.dialogRef.close(true);
      },
      () => {
        this.toastrService.error('Try again');
      }
    );
  }
}
