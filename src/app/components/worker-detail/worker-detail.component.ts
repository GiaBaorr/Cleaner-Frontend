import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/common/worker';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { HiringWorkerComponent } from '../hiring-worker/hiring-worker.component';

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
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

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

  onHireWorker() {
    const matConfig = new MatDialogConfig();
    //config
    matConfig.width = '550px';
    matConfig.data = {
      workerId: this.currentWorker?.id,
    };
    //open
    this.matDialog.open(HiringWorkerComponent, matConfig);
  }
}
