import { Injectable } from '@angular/core';
import { Widget } from '../models/widget';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {

  public widgetUrl = 'api/widgets';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  searchWidgets(term: string): Observable<Widget[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Widget[]>(`${this.widgetUrl}/?name=${term}`);
  }

  getWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.widgetUrl)
      .pipe(
        catchError(this.handleError<Widget[]>('getWidgets'))
      );
  }

  getWidget(id: number): Observable<Widget> {
    if (id === 0) {
      // return 404 ???
    }

    const url = `${this.widgetUrl}/${id}`;
    return this.http.get<Widget>(url)
      .pipe(
        tap(data => console.log('getWidget: ' + JSON.stringify(data))),
        catchError(this.handleError<Widget>('getWidget'))
      );
  }

  updateWidget(widget: Widget): Observable<Widget> {
    return this.http.put<Widget>(this.widgetUrl, widget, this.httpOptions)
      .pipe(
        tap(_ => console.log('widget.service.ts updating widget: ' + JSON.stringify(widget))),
        catchError(this.handleError<Widget>('updateWidget'))
      );
  }

  addWidget(widget: Widget): Observable<Widget> {
    const newWidget = { ...widget, id: null };
    return this.http.post<Widget>(this.widgetUrl, newWidget, this.httpOptions)
      .pipe(
        tap(_ => console.log(`addWidget: ${widget.shape} ${widget.name}`)),
        catchError(this.handleError<Widget>('addWidget'))
      );
  }

  deleteWidget(widget: Widget | number): Observable<Widget> {

    // if widget is a number then use it to build the url otherwise
    // use the widget object's id number
    const id = typeof widget === 'number' ? widget : widget.id;

    const url = `${this.widgetUrl}/${id}`;

    return this.http.delete<Widget>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Widget>('deleteWidget'))
      );
  }

  initializeWidget(): Widget {
    return {
      id: 0,
      shape: '',
      name: ''
    };
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: follow standards for logging infrastructure
      console.error(error); // log to console

      // If a native error is caught, do not transform it. We only want to
      // transform response errors that are not wrapped in an `Error`.
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }

}