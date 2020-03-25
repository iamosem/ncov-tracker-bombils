import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDateStringAdapter } from './utils/datepicker-adapter';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InfiniteScrollModule,
    NgbModule.forRoot(),
    MatProgressBarModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InfiniteScrollModule,
    NgbModule,
    MatProgressBarModule,
    TranslateModule,
    SpinnerComponent
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateStringAdapter }
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
