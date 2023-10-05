import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
})
export class AdminOrderComponent implements OnInit {
  searchMode: boolean = false;
  //
  orders: Order[] = [];
  //pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalElements: number = 0;
  //
  previousKeyword: string = '';

  //
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private toast: ToastrService,
    private router: Router
  ) {}

  //
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(() => {
      this.listOrders();
    });
    this.listOrders();
  }

  listOrders() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchMode = param.has('keyword');
    });

    if (this.searchMode) {
      this.handleSearchMode();
    } else {
      this.handleListMode();
    }
  }

  handleListMode() {
    this.ngxService.start();
    this.orderService.getOrderHistory(this.currentPage - 1).subscribe(
      (data) => {
        this.ngxService.stop();
        this.orders = data.orderHistories;
        this.currentPage = data.currentPage + 1;
        this.totalElements = +data.totalElements;
        this.pageSize = +data.pageSize;
      },
      (error) => {
        this.toast.error('Failed to get order history');
        this.ngxService.stop();
      }
    );
  }

  handleSearchMode() {
    let keyword: string = this.activatedRoute.snapshot.queryParamMap
      .get('keyword')!
      .trim();

    if (keyword != this.previousKeyword) {
      this.currentPage = 1;
    }
    this.previousKeyword = keyword;

    this.orderService
      .getOrderHistoryWithKeyword(keyword, this.currentPage - 1)
      .subscribe(
        (data) => {
          this.ngxService.stop();
          this.orders = data.orderHistories;
          this.currentPage = data.currentPage + 1;
          this.totalElements = +data.totalElements;
          this.pageSize = +data.pageSize;
          //async
          if (this.orders.length == 0) {
            this.toast.info('No orders found');
          }
        },
        (error) => {
          this.toast.error('Failed to get order history');
          this.ngxService.stop();
        }
      );
  }

  onSubmit(value: string): void {
    if (value === '' || value.length === 0) {
      this.router.navigate(['/admin/order']);
    } else {
      this.router.navigate(['/admin/order'], {
        queryParams: { keyword: value },
      });
    }
  }
}
