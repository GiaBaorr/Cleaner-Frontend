import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { Worker } from 'src/app/common/worker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Constructor
  constructor(
    private matDialog: MatDialog,
    private workerService: WorkerServiceService
  ) {}

  handleLoginAction() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(LoginComponent, matConfig);
  }

  handleSignUpAction() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(SignupComponent, matConfig);
  }

  testApi() {
    let myArr: any = [];

    this.workerService.getAllWorkers().subscribe((data) => {
      myArr = data;
    });

    myArr.forEach((element: Worker) => {
      console.log(element.name + ': ' + element.email);
    });
  }
}
