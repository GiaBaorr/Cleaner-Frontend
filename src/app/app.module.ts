import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WorkerListComponent } from './components/worker-list/worker-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { WorkerDetailComponent } from './components/worker-detail/worker-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { RouteGuardService } from './services/route-guard.service';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin'] },
  },
  {
    path: 'user',
    component: UserDetailComponent,
    canActivate: [RouteGuardService],
    data: { expectedRole: ['user', 'worker'] },
  },
  { path: 'workers/:id', component: WorkerDetailComponent },
  { path: 'workers', component: WorkerListComponent },
  { path: '', redirectTo: '/workers', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    WorkerListComponent,
    NotFoundPageComponent,
    WorkerDetailComponent,
    UserDetailComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  //HeaderComponent, FooterComponent, HomeComponent
})
export class AppModule {}
