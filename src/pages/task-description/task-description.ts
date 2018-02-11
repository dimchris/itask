import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

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

  description: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public sanitizer:DomSanitizer) {
    this.description = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDescriptionPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


}
