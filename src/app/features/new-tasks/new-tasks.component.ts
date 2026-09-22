import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
    selector: 'app-new-tasks',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './new-tasks.component.html',
    styleUrl: './new-tasks.component.scss'
})
export class NewTasksComponent {
    private fb = inject(FormBuilder);
    private taskService = inject(TaskService);
    private router = inject(Router);

    loading = signal(false);
    errorMessage = signal<string | null>(null);

    priorities = [
        { value: 1, label: 'Baja' },
        { value: 2, label: 'Media' },
        { value: 3, label: 'Alta' }
    ];

    form = this.fb.nonNullable.group({
        title: ['', [Validators.required]],
        priorityLevel: [2, [Validators.required]],
        notes: ['']
    });

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading.set(true);
        this.errorMessage.set(null);

        this.taskService.createTask(this.form.getRawValue()).subscribe({
            next: () => {
                this.loading.set(false);
                this.router.navigate(['/tasks']);
            },
            error: (err) => {
                this.loading.set(false);
                this.errorMessage.set(err.error?.message ?? 'No se pudo guardar la tarea.');
            }
        });
    }

    cancel(): void {
        this.router.navigate(['/tasks']);
    }
}
