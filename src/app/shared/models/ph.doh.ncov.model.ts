
export interface IUniqueIdField {
  name?: string;
  isSystemMaintained?: boolean;
}

export interface IFields {
  name?: string;
  type?: string;
  alias?: string;
  sqlType?: string;
  length?: number;
  domain?: any;
  defaultValue?: any;
}

export interface IFeatures {
  attributes?: any;
}

export interface IPhDohNCov {
  objectIdFieldName?: string;
  uniqueIdField?: IUniqueIdField;
  globalIdFieldName?: string;
  fields?: IFields[];
  features?: IFeatures[];
}

export class PhDohNCov implements IPhDohNCov {
  constructor(
    public objectIdFieldName?: string,
    public uniqueIdField?: IUniqueIdField,
    public globalIdFieldName?: string,
    public fields?: IFields[],
    public features?: IFeatures[]
  ) { }
}
