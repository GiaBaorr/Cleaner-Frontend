import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private matDialog: MatDialog,
    private workerService: WorkerServiceService
  ) {}

  onOpenLogin() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(LoginComponent, matConfig);
  }

  onOpenSignUp() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(SignupComponent, matConfig);
  }
}
