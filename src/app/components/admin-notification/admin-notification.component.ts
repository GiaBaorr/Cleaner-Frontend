import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkerUpdateNoti } from 'src/app/common/worker-update-noti';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss'],
})
export class AdminNotificationComponent implements OnInit {
  workerNoti?: WorkerUpdateNoti[] = [];

  constructor(
    private notiService: NotificationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.listNotifications();
  }

  listNotifications(): void {
    this.notiService.getWorkerUpdateNotifications().subscribe((data) => {
      this.workerNoti = data;
    });
  }

  onApproveChange(workerId: number) {
    let data = {
      workerId: workerId,
      isApprove: true,
    };
    this.notiService.updateWorkerNotificationsRequest(data).subscribe(() => {
      this.listNotifications();
      this.toastrService.success('Request approved');
    });
  }

  onDeclineChange(workerId: number) {
    let data = {
      workerId: workerId,
      isApprove: false,
    };
    this.notiService.updateWorkerNotificationsRequest(data).subscribe(() => {
      this.listNotifications();
      this.toastrService.info('Request declined');
    });
  }
}
