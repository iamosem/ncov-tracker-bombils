import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IHerokuNcov } from '../models/heroku.ncov.model';
import { createRequestOption } from '../utils/request.utils';
import { HEROKU_SERVER_API } from 'src/app/app.constants';

@Injectable({ providedIn: 'root' })
export class HerokuSourceService extends HttpService<IHerokuNcov> {
    constructor(private _http: HttpClient) {
        super(HEROKU_SERVER_API, _http);
        this.resourceUrl = '';
    }

    getLatest(): Observable<HttpResponse<IHerokuNcov>> {
        return this._http.get<IHerokuNcov>(`${this.resourceUrl}latest`, { observe: 'response' });
    }

    getAllLocations(timelines = 0): Observable<HttpResponse<IHerokuNcov>> {
      const options = createRequestOption({ timelines });
      return this._http.get<IHerokuNcov>(`${this.resourceUrl}locations`, { params: options, observe: 'response' });
    }

    queryLocation(req?: string): Observable<HttpResponse<IHerokuNcov>> {
      const options = createRequestOption(req);
      return this._http.get<IHerokuNcov>(`${this.resourceUrl}locations`, { params: options, observe: 'response' });
    }

}
