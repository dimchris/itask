import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { TasksProvider } from './../../providers/tasks/tasks';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskDescriptionPage } from '../task-description/task-description';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'favorites-page',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  tasks: TaskListItem[];
  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    private tasksCtrl: TasksProvider,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ionViewDidEnter(){
    this.updateFavorites(null)
  }

  updateFavorites(event:any){
    if(event) console.log(event);
    
    this.tasksCtrl.getFavorites().then(
      data => {
        this.tasks = data
        console.log(this.tasks);
      }
    )
    .catch(
      error => {
        this.toastCtrl.create({message:'Could not load tasks..', duration:2000})
        .present()
      }
    )
  }
}
