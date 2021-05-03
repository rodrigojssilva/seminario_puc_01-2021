import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClienteX } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Clientes/';
  }

  getClientes(): Observable<ClienteX[]> {
    return this.http.get<ClienteX[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCliente(postId: number): Observable<ClienteX> {
      return this.http.get<ClienteX>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveCliente(cliente: ClienteX): Observable<ClienteX> {
      return this.http.post<ClienteX>(this.myAppUrl + this.myApiUrl, JSON.stringify(ClienteX), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateCliente(postId: number, cliente: ClienteX): Observable<ClienteX> {
      return this.http.put<ClienteX>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(ClienteX), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteCliente(postId: number): Observable<ClienteX> {
      return this.http.delete<ClienteX>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
