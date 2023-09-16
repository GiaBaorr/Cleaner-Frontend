import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private matDialog: MatDialog) {}

  handleLoginAction() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(SignupComponent, matConfig);
  }
}
