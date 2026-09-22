import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

const API_URL = 'http://localhost:5236/api';
const TOKEN_KEY = 'taskflow_token';


export interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    isLoggedIn = signal<boolean>(this.hasToken());


    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${API_URL}/Auth/login`, payload).pipe(
            tap((res) => {
                localStorage.setItem(TOKEN_KEY, res.token);
                this.isLoggedIn.set(true);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        this.isLoggedIn.set(false);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(TOKEN_KEY);
    }
}
