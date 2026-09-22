import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'register',
        loadComponent: () =>
            import('./features/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'tasks',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/tasks/tasks.component').then((m) => m.TasksComponent)
    },
    {
        path: 'new-tasks',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/new-tasks/new-tasks.component').then((m) => m.NewTaskComponent)
    },
    { path: '**', redirectTo: 'login' }
];
