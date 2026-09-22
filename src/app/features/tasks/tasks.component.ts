import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';
import { TaskItem } from '../../core/models/task.model';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
    private taskService = inject(TaskService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    tasks = signal<TaskItem[]>([]);
    loading = signal(true);
    deletingId = signal<string | null>(null);

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading.set(true);
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.snackBar.open('No se pudieron cargar las tareas.', 'Cerrar', { duration: 3000 });
            }
        });
    }

    deleteTask(task: TaskItem): void {
        this.deletingId.set(task.id);
        this.taskService.deleteTask(task.id).subscribe({
            next: () => {
                // Se quita de la vista sin recargar la pagina
                this.tasks.update((current) => current.filter((t) => t.id !== task.id));
                this.deletingId.set(null);
                this.snackBar.open('Tarea eliminada.', 'Cerrar', { duration: 2000 });
            },
            error: () => {
                this.deletingId.set(null);
                this.snackBar.open('No se pudo eliminar la tarea.', 'Cerrar', { duration: 3000 });
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    priorityLabel(level: number): string {
        switch (level) {
            case 1:
                return 'Baja';
            case 2:
                return 'Media';
            case 3:
                return 'Alta';
            default:
                return `Nivel ${level}`;
        }
    }
}

