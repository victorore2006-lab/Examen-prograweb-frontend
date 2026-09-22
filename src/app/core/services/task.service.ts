import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NewTask, TaskItem } from '../models/task.model';


const API_URL = 'http://localhost:5236/api';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${API_URL}/Task`);
  }

  createTask(task: NewTask): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${API_URL}/Task`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/Task/${id}`);
  }
}
