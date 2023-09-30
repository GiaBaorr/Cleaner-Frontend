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
  workerTag: string = '';
  ratedStar: any[] = [];
  leftOverStar: any[] = [];

  //tag : base on review and order history

  constructor(
    private WorkerService: WorkerServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];

    this.WorkerService.getWorkerDetail(id).subscribe((worker) => {
      this.currentWorker = worker;
      this.assignWorkerTag(this.currentWorker.countOrder!);
      this.createArrForStar(this.currentWorker.averageRate!);
    });

    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  assignWorkerTag(countOrder: number): void {
    if (countOrder! > 5) {
      this.workerTag = 'Dedicated';
    } else if (countOrder! > 15) {
      this.workerTag = 'Hardworking';
    } else {
      this.workerTag = 'Talented';
    }
  }

  createArrForStar(rate: number) {
    this.ratedStar = new Array(rate);
    this.leftOverStar = new Array(5 - rate);
  }
}
