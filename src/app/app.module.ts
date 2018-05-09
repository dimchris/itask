import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SearchResultsPage } from './../pages/search-results/search-results';
import { TaskListItemComponent } from './../components/task-list-item/task-list-item';
import { TaskPage } from './../pages/task/task';
import { Task } from './../models/Task';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TaskDescriptionPage } from '../pages/task-description/task-description';
import { OrderByPipe } from '../pipes/order-by/order-by';
import { UserPreferencesProvider } from '../providers/user-preferences/user-preferences';
import { FavoritesPage } from '../pages/favorites/favorites';
import { TasksProvider } from '../providers/tasks/tasks';
import { DragulaModule } from 'ng2-dragula';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    SearchPage,
    TabsPage,
    TaskDescriptionPage,
    OrderByPipe,
    FavoritesPage,
    TaskPage,
    TaskListItemComponent,
    SearchResultsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:true}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    SearchPage,
    TabsPage,
    TaskDescriptionPage,
    FavoritesPage,
    TaskPage,
    SearchResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenOrientation,
    UserPreferencesProvider,
    TasksProvider,
    TextToSpeech
  ]
})
export class AppModule {}
