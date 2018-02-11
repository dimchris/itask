import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ItemsProvider } from '../../mocks/providers/items/items';
import { ListItem } from '../../models/list-item';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskDescriptionPage } from '../task-description/task-description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: ListItem[] = []
  constructor(itemsProvider: ItemsProvider, public navCtrl: NavController, public sanitizer:DomSanitizer, public modalCtrl: ModalController) {
    this.items = itemsProvider.query();
  }

  describe(item){
    // this.navCtrl.push(TaskDescriptionPage,{
    //   item: item
    // });
    let description = this.modalCtrl.create(TaskDescriptionPage, {item:item});
    description.present();
  }
}
