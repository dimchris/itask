import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Card } from './../../models/Card';
import { Task } from './../../models/Task';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  task: Task;
  cards: Card[]
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dragulaCtrl: DragulaService,
  ) {
    this.task = navParams.get('task')
    this.cards = this.task.cards.slice()
    console.log(this.task);
    dragulaCtrl.drag.subscribe( val => {
      // console.log(val);
      console.log(this.cards);
      
      
    })
    dragulaCtrl.drop.subscribe( val =>{
      // console.log(val);
      console.log(this.cards);
            
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}
