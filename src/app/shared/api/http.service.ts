import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../utils/request.utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private _api: string;
  private _url: string;

  constructor(_api: string, private http: HttpClient) {
    this._api = _api;
  }

  set resourceUrl(url) {
      this._url = url;
  }

  get resourceUrl() {
      return this._api + this._url;
  }

  create(data: T): Observable<HttpResponse<T>> {
      return this.http.post<T>(this.resourceUrl, data, { observe: 'response' });
  }

  update(data: T): Observable<HttpResponse<T>> {
      return this.http.put<T>(this.resourceUrl, data, { observe: 'response' });
  }

  find(id: string): Observable<HttpResponse<T>> {
      return this.http.get<T>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<T[]>> {
      const options = createRequestOption(req);
      return this.http.get<T[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
      return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
