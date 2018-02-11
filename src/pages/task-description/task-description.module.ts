import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDescriptionPage } from './task-description';

@NgModule({
  declarations: [
    TaskDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDescriptionPage),
  ],
})
export class TaskDescriptionPageModule {}
