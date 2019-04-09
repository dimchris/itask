import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { TranslateService } from '@ngx-translate/core';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab4Title=" ";
  tab3Title=" ";
  tab2Title=" ";
  tab1Title=" ";
  tab5Title=" ";
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SettingsPage;
  tab4Root = SearchPage;
  tab5Root = FavoritesPage;

  constructor(translateService:TranslateService) {
    translateService.get(['HOME_TAB_TITLE', 'SEARCH_TAB_TITLE', 'ABOUT_TAB_TITLE', 'SETTINGS_TAB_TITLE', 'FAVORITES_TAB_TITLE']).subscribe(values => {
      this.tab1Title = values['HOME_TAB_TITLE'];
      this.tab2Title = values['SEARCH_TAB_TITLE'];
      this.tab3Title = values['ABOUT_TAB_TITLE'];
      this.tab4Title = values['SETTINGS_TAB_TITLE'];
      this.tab5Title = values['FAVORITES_TAB_TITLE'];
    });
  }
}
