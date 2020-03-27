import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { createRequestOption } from '../utils/request.utils';
import { PH_DOH_SERVER_API } from 'src/app/app.constants';
import { IPhDohNCov } from '../models/ph.doh.ncov.model';

// tslint:disable: max-line-length

@Injectable({ providedIn: 'root' })
export class PhDohSourceService extends HttpService<IPhDohNCov> {
  constructor(private _http: HttpClient) {
    super(PH_DOH_SERVER_API, _http);
    this.resourceUrl = '';
  }

  getConfirmed(): Observable<HttpResponse<IPhDohNCov>> {
    return this._http.get<IPhDohNCov>(
      `${this.resourceUrl}slide_fig/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true`,
      { observe: 'response' }
    );
  }

  getSummary(): Observable<HttpResponse<IPhDohNCov>> {
    return this._http.get<IPhDohNCov>(
      `${this.resourceUrl}confirmed/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=date%20asc&outSR=102100&resultOffset=0&cacheHint=true`,
      { observe: 'response' }
    );
  }

  getMasterlist(): Observable<HttpResponse<IPhDohNCov>> {
    return this._http.get<IPhDohNCov>(
      `${this.resourceUrl}PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=sequ%20desc&outSR=102100&resultOffset=0&cacheHint=true`,
      { observe: 'response' }
    );
  }
}
