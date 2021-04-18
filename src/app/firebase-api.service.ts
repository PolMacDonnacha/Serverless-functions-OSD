import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Book} from '../book';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
appURL = 'https://us-central1-serverless-functions-81fee.cloudfunctions.net';
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getBooks(): Observable<Book> {
    return this.http.get<Book>(this.appURL + '/getBooks')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  addBook(title:string, author:String):  Observable<Book> {
    console.log('adding book');
    return this.http.post<Book>(this.appURL + '/addBook?title=' + title + '&author=' + author,'')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  delBook(id:string):  Observable<Book> {
    console.log('deleting book');
    return this.http.delete<Book>(this.appURL + '/deleteBook?id=' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error)
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent)
    {
      errorMessage = error.error.message;
    }
    else
    {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}

