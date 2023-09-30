import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { Worker } from 'src/app/common/worker';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss'],
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];
  searchMode: boolean = false; //to check if it search or list
  //pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalElements: number = 0;

  constructor(
    private workerService: WorkerServiceService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(() => this.listWorkers());
    this.listWorkers();
    window.scrollTo(0, 0);
  }

  listWorkers() {
    this.route.queryParamMap.subscribe((param) => {
      this.searchMode = param.has('keyword');
    });

    if (this.searchMode) {
      this.handleSearchMode();
    } else {
      this.handleListMode();
    }

    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  handleListMode() {
    // console.log('----LIST MODE---');

    this.ngxService.start();
    this.workerService
      .getAllWorkersWithPagination(this.currentPage - 1)
      .subscribe((data: any) => {
        this.ngxService.stop();
        this.workers = data.accounts;
        this.currentPage = data.currentPage + 1;
        this.totalElements = +data.totalElements;
      });
  }

  handleSearchMode() {
    let keyword: string = this.route.snapshot.queryParamMap.get('keyword')!;
    console.log('Search mode:' + keyword);
  }

  seeWorkerDetail(id: any) {
    this.router.navigate(['/workers/' + id]);
  }
}
