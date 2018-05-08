import { TaskDescriptionPage } from './../task-description/task-description';
import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { TasksProvider } from './../../providers/tasks/tasks';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  tasks: TaskListItem[];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private tasksCtrl: TasksProvider,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navParms: NavParams
  ) { 
    this.tasks = navParms.get('tasks')
    console.log(this.tasks);
    
  }

  ionViewDidLoad(){
  }
}
