import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../shared/language/language.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'ncov-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  name: string;

  public config: PerfectScrollbarConfigInterface = {};
  public languages = LANGUAGES;

  constructor(
    private modalService: NgbModal,
    private translate: TranslateService,
    private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const set = function() {
      const width =
        window.innerWidth > 0 ? window.innerWidth : this.screen.width;
      const topOffset = 0;
      if (width < 1170) {
        $('#main-wrapper').addClass('mini-sidebar');
      } else {
        $('#main-wrapper').removeClass('mini-sidebar');
      }
    };
    $(window).ready(set);
    $(window).on('resize', set);

    $('.search-box a, .search-box .app-search .srh-btn').on(
      'click',
      function () {
        $('.app-search').toggle(200);
      }
    );

    $('body').trigger('resize');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  currentLanguage() {
    return this.translate.currentLang ? this.translate.currentLang : 'en';
  }
}
