import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public userPreferences: UserPreferencesProvider  
  ) {
    this.description = navParams.get('item');
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
    item.likeToggle();
    this.userPreferences.add(item);
    this.presentToast(msg);
  }

  removeFromFavorite(item) {
    let msg;
    this.translateService.get('REMOVE_FAVORITE').subscribe(
      value => {
        // value is our translated string
        msg = value;
      }
    );
    item.likeToggle();
    this.presentToast(msg);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
