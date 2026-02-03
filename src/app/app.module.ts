import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { StatCardComponent } from './components/shared/stat-card/stat-card.component';
import { StatusBadgeComponent } from './components/shared/status-badge/status-badge.component';

import { ComplaintService } from './services/complaint.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ComplaintListComponent,
    ComplaintFormComponent,
    ComplaintDetailsComponent,
    HeaderComponent,
    SidebarComponent,
    StatCardComponent,
    StatusBadgeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ComplaintService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
