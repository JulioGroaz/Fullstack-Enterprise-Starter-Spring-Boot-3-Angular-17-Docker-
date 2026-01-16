// Scopo: configurazione route per aree pubbliche e protette.
// Sezioni: import componenti e definizione dei percorsi.
// Scelte UI/UX: separazione chiara tra login e area protetta.
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersPageComponent } from './features/users/pages/users-page/users-page.component';
import { ShellComponent } from './components/shell/shell.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

// Definizione delle route e guardie applicate.
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      {
        path: 'admin/users',
        component: UsersPageComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] }
      },
      { path: '', pathMatch: 'full', redirectTo: 'profile' }
    ]
  },
  { path: '**', redirectTo: 'profile' }
];
