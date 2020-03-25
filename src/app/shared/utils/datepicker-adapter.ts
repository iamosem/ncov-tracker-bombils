/**
 * Angular bootstrap Date adapter
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class NgbDateStringAdapter extends NgbDateAdapter<string> {
  readonly DT_FORMAT = 'YYYY-MM-DD';

  fromModel(date: string): NgbDateStruct {
    if (date != null) {
      const momentDate = moment(date, this.DT_FORMAT);
      if (momentDate.isValid()) {
        return { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
      }
    }
    return null;
  }

  toModel(date: NgbDateStruct): string {
    if (!date) {
      return '';
    }
    const momentDate = moment([date.year, date.month - 1, date.day]);
    if (!momentDate.isValid()) {
      return '';
    }
    return momentDate.format(this.DT_FORMAT);
  }
}
