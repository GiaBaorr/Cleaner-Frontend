import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/order';
import { GlobalConstants } from 'src/app/global-constant';
import { OpenAIService } from 'src/app/services/open-ai.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-guest-review-order',
  templateUrl: './guest-review-order.component.html',
  styleUrls: ['./guest-review-order.component.scss'],
})
export class GuestReviewOrderComponent implements OnInit {
  order?: Order;
  reviewOrderForm: any = FormGroup;
  //
  constructor(
    private openAiService: OpenAIService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {}
  //
  ngOnInit(): void {
    //build form
    this.reviewOrderForm = this.formBuilder.group({
      orderId: [this.order?.id],
      reviewContent: [''],
      guestEmail: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      rate: [null, Validators.required],
    });

    //call API
    let id = this.route.snapshot.params['id'];

    this.orderService.getOrderByOrderId(id).subscribe(
      (order) => {
        this.order = order;
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
  }

  async onSubmitReview() {
    let formValue = this.reviewOrderForm.value;

    let formData = {
      orderId: this.order?.id,
      reviewContent: formValue.reviewContent,
      rate: formValue.rate,
      email: formValue.guestEmail,
    };

    //CHECK SENSITIVE
    const isSensitive = this.openAiService
      .generateText(formData.reviewContent)
      .subscribe(
        (data: any) => {
          let message: string = data.choices[0].message.content;
          if (message.toLowerCase().includes('true')) {
            this.toastService.warning(
              'Your comment contains hate speech. Please check again.'
            );
          } else {
            //SAVE COMMENT
            this.orderService.userReviewOrder(formData).subscribe(
              (res) => {
                this.toastService.success('Review saved ');
              },
              (err) => {
                this.toastService.error(err.error);
              }
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //
  onClear() {
    this.reviewOrderForm.reset();
  }
}
