import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the UserPreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserPreferencesProvider {
  items = [];
  favorites = [];
  constructor(public http: HttpClient, private storage: Storage) {
    storage.get('items').then((val) => {
      if (val) {
        this.items = val;
        console.log(val)
      }
    })
    storage.get('favorites').then((val) => {
      if (val) {
        this.favorites = val;
      }
    })
    console.log('Hello UserPreferencesProvider Provider');
    console.log(this.items);

  }
  add(item) {
    this.items.push(item)
    this.storage.set('items', (this.items));
  }
  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.storage.set('items', this.items);
  }

  like(id) {
    this.favorites.push(id);
    this.updateFavorites();
  }
  unlike(id) {
    this.favorites.splice(this.favorites.indexOf(id), 1);
    this.updateFavorites()
  }
  private updateFavorites() {
    this.storage.set('favorites', this.favorites);
  }
}
