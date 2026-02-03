import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'complaints', 
    component: ComplaintListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'complaints/new', 
    component: ComplaintFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'complaints/edit/:id', 
    component: ComplaintFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'complaints/:id', 
    component: ComplaintDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
