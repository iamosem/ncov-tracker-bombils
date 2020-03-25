import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ncov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ncov-tracker';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
