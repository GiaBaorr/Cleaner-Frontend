import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkerUpdateNoti } from '../common/worker-update-noti';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getWorkerUpdateNotifications() {
    let url = 'https://localhost:5001/api/workers/admin/track';

    return this.http.get<WorkerUpdateNoti[]>(url);
  }

  updateWorkerNotificationsRequest(data: any) {
    let url = 'https://localhost:5001/api/workers/admin/submit';

    return this.http.put(url, data);
  }
}
