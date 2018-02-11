import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('gr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('gr');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
