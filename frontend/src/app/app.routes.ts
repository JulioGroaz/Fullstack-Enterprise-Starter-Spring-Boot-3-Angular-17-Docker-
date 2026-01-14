// English: Route configuration for public and protected areas.
// Italiano: Configurazione route per aree pubbliche e protette.
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ProfileComponent } from './components/profile.component';
import { AdminUsersComponent } from './components/admin-users.component';
import { ShellComponent } from './components/shell.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

// English: Defines the application routes and guards.
// Italiano: Definisce le route e le guardie dell'applicazione.
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      {
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] }
      },
      { path: '', pathMatch: 'full', redirectTo: 'profile' }
    ]
  },
  { path: '**', redirectTo: 'profile' }
];
