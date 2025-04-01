import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service'; // You'll need to add this dependency

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.API_URL;
  private tokenCookieName = 'token'; // Update this to match your cookie name

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    private cookieService: CookieService
  ) {}

  // Helper method to get authorization headers with bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get(this.tokenCookieName);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /** GET request */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** POST request */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** PUT request */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** DELETE request */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAll(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}/${id}`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteIt(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** Handle API errors and show toast notifications */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Une erreur est survenue. Veuillez réessayer plus tard.';

    if (error.status === 0) {
      errorMsg = 'Erreur de connexion au serveur. Vérifiez votre connexion Internet.';
    } else if (error.status === 400) {
      errorMsg = 'Requête invalide. Vérifiez les informations envoyées.';
    } else if (error.status === 401) {
      errorMsg = 'Non autorisé. Veuillez vous connecter.';
    } else if (error.status === 403) {
      errorMsg = "Accès refusé. Vous n'avez pas les permissions nécessaires.";
    } else if (error.status === 404) {
      errorMsg = 'Ressource non trouvée.';
    } else if (error.status === 500) {
      errorMsg = 'Erreur interne du serveur.';
    }

    // 🔥 Show error toast
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: errorMsg,
      life: 5000
    });

    return throwError(() => new Error(errorMsg));
  }
}