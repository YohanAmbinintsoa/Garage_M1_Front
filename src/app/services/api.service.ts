import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** GET request */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  /** POST request */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** PUT request */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /** DELETE request */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAll(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data);
  }

  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  deleteIt(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`);
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
      errorMsg = 'Accès refusé. Vous n’avez pas les permissions nécessaires.';
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
