import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListItem } from '../../../models/list-item';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {

  items: ListItem[]=[];
  constructor(public http: HttpClient) {
    console.log('Hello ItemsProvider Provider');
    let items = [
      {
        title: "Αυτό είναι ένα έργο",
        description: "Αυτό το έργο αφορά το πλύσιμο των χεριών sdfslkdfjsldjf sldjflskjdf sdflskdjflsdkjfsdl fsdfkjsldkjflskjdflkjsdlfkjskldkfjlsdkjflskdjflskjdflj",
        image: "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",
        rating: 4
      },
      {
        title: "Αυτό είναι ένα έργο",
        description: "Αυτό το έργο αφορά το πλύσιμο των χεριών",
        image: "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",
        rating: 4
      },
      {
        title: "Αυτό είναι ένα έργο",
        description: "Αυτό το έργο αφορά το πλύσιμο των χεριών",
        image: "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",
        rating: 4
      },
      {
        title: "Αυτό είναι ένα έργο",
        description: "Αυτό το έργο αφορά το πλύσιμο των χεριών",
        image: "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",
        rating: 4
      }
    ]
    for(let item of items){
      this.items.push(new ListItem(Math.random(), item.title, item.description, item.image, 5,  item.rating));
    }
  }

  query(params?: any){
    if(!params){
      return this.items;
    }
    return this.items.filter((item)=>{
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    })
  }

  add(item: ListItem) {
    this.items.push(item);
  }

  delete(item: ListItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

}
