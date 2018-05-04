import { TasksProvider } from './../../providers/tasks/tasks';
import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

/**
 * Generated class for the TaskDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-description',
  templateUrl: 'task-description.html',
})
export class TaskDescriptionPage {
  task: TaskListItem;
  fav: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public tasksCtrl: TasksProvider
  ) {
    this.task = navParams.get('item');
    console.log(this.task);
    
    tasksCtrl.isFavorite(this.task._id).then(
      fav => {     
        this.fav = fav
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDescriptionPage');
  }
  addToFavorite(item) {
    let msg;
    this.translateService.get('ADD_FAVORITE').subscribe(
      value => {
        // value is our translated string
        msg = value;
      }
    );
    this.tasksCtrl.addToFavorites(this.task).then(_ => {
      this.fav = true
      this.toastCtrl.create({ message: msg, duration: 2000 })
        .present()
    }).catch(error => {
      console.log(error);
    })
  }

  removeFromFavorite(item) {
    let msg;
    this.translateService.get('REMOVE_FAVORITE').subscribe(
      value => {
        // value is our translated string
        msg = value;
      }
    );
    this.tasksCtrl.removeFromFavorites(this.task._id).then(_ => {
      this.fav = false;
      this.toastCtrl.create({ message: msg, duration: 2000 })
        .present()
    }).catch(error => {
      console.log(error);
    })
  }

  isfavored(task: TaskListItem) {
    return this.tasksCtrl.isFavorite(task._id)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onStart(taskId: string){
    console.log(taskId);
    
    this.tasksCtrl.getTask(taskId)
      .then( task => {
        console.log(task);
      })
  }
}
