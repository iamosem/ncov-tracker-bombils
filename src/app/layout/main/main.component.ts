import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DARK_THEME_KEY, COLOR_THEME_KEY } from 'src/app/app.constants';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'ncov-full-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  color = 'blue';

  showSettings = false;
  showDarktheme = false;

  scrollingSubscription;
  showScrollToTop = false;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router) {
    const darkTheme = localStorage.getItem(DARK_THEME_KEY);
    if (null !== darkTheme && undefined !== darkTheme) {
      this.showDarktheme = darkTheme === '1';
    }

    const themeColor = localStorage.getItem(COLOR_THEME_KEY);
    if (null !== themeColor && undefined !== themeColor) {
      this.color = themeColor;
    }
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/dashboard1']);
    }

    const container = document.querySelector('div.page-wrapper div.container-fluid');
    this.scrollingSubscription = fromEvent(container, 'scroll').subscribe(e => {
      if (container.scrollTop && container.scrollTop > 200) {
        this.showScrollToTop = true;
      } else {
        this.showScrollToTop = false;
      }
    });
  }


  ngOnDestroy(): void {
    this.scrollingSubscription.unsubscribe();
  }

  toggleTheme() {
    localStorage.setItem(DARK_THEME_KEY, this.showDarktheme ? '1' : '0');
  }

  changeColor() {
    localStorage.setItem(COLOR_THEME_KEY, this.color);
  }

  scrollToTop() {
    const container = document.querySelector('div.page-wrapper div.container-fluid');
    container.scroll({ top: 0, behavior: 'smooth' });
  }
}
