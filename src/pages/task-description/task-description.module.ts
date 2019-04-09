import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDescriptionPage } from './task-description';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TaskDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDescriptionPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class TaskDescriptionPageModule {}
