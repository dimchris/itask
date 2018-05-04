import { TaskDescriptionPage } from './../task-description/task-description';
import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { TasksProvider } from './../../providers/tasks/tasks';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: TaskListItem[];
  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    private tasksCtrl: TasksProvider,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ionViewDidLoad(){
    let loading = this.loadCtrl.create({ content: 'Ανανέωση Λίστας Παιχνιδιών...' })
    loading.present();
    this.tasksCtrl.getTaskList().then(
      data => {
        this.tasks = data
        console.log(this.tasks);
        loading.dismiss()
        this.tasksCtrl.saveTasklist(data)
      }
    )
    .catch(
      error => {
        console.log(error);
        loading.dismiss()
        this.toastCtrl.create({message:'Δεν είναι δυνατή η ανανέωση της λίστας. Δε βρέθηκε σύνδεση στο διαδίκτυο.', duration:4000})
        .present()
        this.tasksCtrl.getTaskListFromStorage().then( data => {
          this.tasks = data ;
        })
      }
    )
  }
  onTaskTap(item) {
    console.log('tapped');
    // this.navCtrl.push(TaskDescriptionPage, {item})
    let description = this.modalCtrl.create(TaskDescriptionPage, { item: item },{cssClass:'my-modal'});
    description.present();
  }


}
