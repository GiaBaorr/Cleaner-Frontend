import { Component, OnInit } from '@angular/core';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { Worker } from 'src/app/common/worker';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss'],
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];

  constructor(private workerService: WorkerServiceService) {}

  ngOnInit(): void {
    this.workerService.getAllWorkers().subscribe((data: any) => {
      this.workers = data.accounts;
    });
  }
}
