import { TaskListItemComponent } from './../../components/task-list-item/task-list-item';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';

@NgModule({
  declarations: [
    FavoritesPage,
    TaskListItemComponent
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
  ],
})
export class FavoritesPageModule {}
