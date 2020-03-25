export interface IHNCLatest {
  confirmed?: number;
  deaths?: number;
  recovered?: number;
}

export interface IHNCCoordinates {
  latitude?: string;
  longitude?: string;
}

export interface IHNCTimelineDetails {
  latest?: number;
  timeline?: any;
}

export interface IHNCTimeline {
  confirmed?: IHNCTimelineDetails;
  deaths?: IHNCTimelineDetails;
  recovered?: IHNCTimelineDetails;
}

export interface IHNCLocations {
  coordinates?: IHNCCoordinates;
  country?: string;
  country_code?: string;
  id?: number;
  last_updated?: string;
  latest?: IHNCLatest;
  province?: string;
  timelines?: IHNCTimeline;
}

export interface IHerokuNcov {
  latest?: IHNCLatest;
  locations?: IHNCLocations[];
}

export class HerokuNcov implements IHerokuNcov {
  constructor(
      public latest?: IHNCLatest,
      public locations?: IHNCLocations[]
  ) {}
}
