import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Worker } from 'src/app/common/worker';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { UpdateWorkerDialogComponent } from '../update-worker-dialog/update-worker-dialog.component';

@Component({
  selector: 'app-admin-worker',
  templateUrl: './admin-worker.component.html',
  styleUrls: ['./admin-worker.component.scss'],
})
export class AdminWorkerComponent implements OnInit {
  searchMode: boolean = false;
  //
  workers: Worker[] = [];
  //pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalElements: number = 0;
  //
  previousKeyword: string = '';

  constructor(
    private workerService: WorkerServiceService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(() => {
      this.listWorkers();
    });
    this.listWorkers();
  }

  listWorkers() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.searchMode = param.has('keyword');
    });
    if (this.activatedRoute.snapshot.queryParams['keyword']) {
      this.searchMode = true;
    }

    if (this.searchMode) {
      this.handleSearchMode();
    } else {
      this.handleListMode();
    }
  }

  handleSearchMode() {
    let keyword: string = this.activatedRoute.snapshot.queryParamMap
      .get('keyword')!
      .trim();

    if (keyword != this.previousKeyword) {
      this.currentPage = 1;
    }
    this.previousKeyword = keyword;

    this.workerService
      .getWorkerWithKeywordFromAdmin(keyword, this.currentPage - 1)
      .subscribe(
        (data) => {
          this.workers = data.list;
          this.currentPage = data.currentPage + 1;
          this.totalElements = +data.totalElements;
          this.pageSize = +data.pageSize;
        },
        (error) => {
          this.toast.error('Failed to get workers list');
        }
      );
  }

  handleListMode() {
    this.workerService
      .getAllWorkersWithPaginationFromAdmin(this.currentPage - 1)
      .subscribe(
        (data) => {
          this.workers = data.list;
          this.currentPage = data.currentPage + 1;
          this.totalElements = +data.totalElements;
          this.pageSize = +data.pageSize;
        },
        (error) => {
          this.toast.error('Failed to get workers list');
        }
      );
  }

  onSubmit(value: string): void {
    if (value === '' || value.length === 0) {
      this.router.navigate(['/admin/worker']);
    } else {
      this.router.navigate(['/admin/worker'], {
        queryParams: { keyword: value },
      });
    }
  }

  onChange(event: MatSlideToggleChange, workerId: number, version: string) {
    let data = {
      WorkerId: workerId,
      Status: event.checked,
      version: version,
    };

    this.workerService.updateWorkerStatus(data).subscribe(
      () => {
        this.toast.success('This worker status has been updated');
        this.listWorkers();
      },
      () => {
        event.source.checked = !event.checked;

        this.toast.error('There was an error updating worker status');
        this.toast.info('Information has been updated, please try again');
        this.listWorkers();
      }
    );
  }

  onEditWorker(event: Event, worker: Worker) {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    matConfig.panelClass = 'dialog-panel';
    matConfig.data = {
      worker: worker,
    };
    this.matDialog
      .open(UpdateWorkerDialogComponent, matConfig)
      .afterClosed()
      .subscribe((value) => {
        if (value !== undefined) {
          if (value == true) {
            this.listWorkers();
          }
        }
      });
  }
}
