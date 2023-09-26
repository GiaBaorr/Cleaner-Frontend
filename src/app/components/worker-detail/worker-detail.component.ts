import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/common/worker';
import { WorkerServiceService } from 'src/app/services/worker-service.service';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.scss'],
})
export class WorkerDetailComponent implements OnInit {
  currentWorker?: Worker;

  //tag : base on review and order history

  constructor(
    private WorkerService: WorkerServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];

    this.WorkerService.getWorkerDetail(id).subscribe((worker) => {
      this.currentWorker = worker;
      console.log(worker);
    });
  }
}
