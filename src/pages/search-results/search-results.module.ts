import { TaskListItemComponent } from './../../components/task-list-item/task-list-item';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultsPage } from './search-results';

@NgModule({
  declarations: [
    SearchResultsPage,
    TaskListItemComponent
  ],
  imports: [
    IonicPageModule.forChild(SearchResultsPage),
  ],
})
export class SearchResultsPageModule {}
