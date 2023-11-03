import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { UserReviewOrderDialogComponent } from '../user-review-order-dialog/user-review-order-dialog.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderHistoryFromWUser().subscribe((data) => {
      this.orders = data;
      this.orders.forEach((element) => {
        element.dateString = element.date?.toString().split('T')[0];
      });
    });
  }

  onReviewDialog(order: Order): void {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    matConfig.panelClass = 'dialog-panel';
    matConfig.data = {
      order: order,
    };

    this.matDialog
      .open(UserReviewOrderDialogComponent, matConfig)
      .afterClosed()
      .subscribe((value) => {
        if (value !== undefined) {
          if (value == true) {
            this.ngOnInit();
          }
        }
      });
  }
}
