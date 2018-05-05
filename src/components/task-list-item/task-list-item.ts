import { TasksProvider } from './../../providers/tasks/tasks';
import { ModalController } from 'ionic-angular';
import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskDescriptionPage } from '../../pages/task-description/task-description';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the TaskListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'task-list-item',
  templateUrl: 'task-list-item.html'
})
export class TaskListItemComponent {
  @Input('task') task: TaskListItem
  @Output('onModalDismissed') onModalDismissed = new EventEmitter<boolean>();
  constructor(
    private modalCtrl: ModalController,
    private tasksCtrl: TasksProvider,
    public sanitizer: DomSanitizer,
  ) {
  }

  onTaskTap(item) {
    let description = this.modalCtrl.create(TaskDescriptionPage, { item: item });
    description
      .present();
    description.onDidDismiss(data => {  
      this.onModalDismissed.emit(true)
    })
  }
}
