import { SearchResultsPage } from './../search-results/search-results';
import { TasksProvider } from './../../providers/tasks/tasks';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public taskCtrl: TasksProvider,
    public loadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(event) {
    console.log(event);
  }

  onSubmit(form: NgForm) {
    let loader = this.loadCtrl.create({
      content: 'Παρακαλώ Περιμένετε'
    })
    loader.present()
    let age = null, level = null, name = null, tags = null;
    if (form.value.ageFrom || form.value.ageTo) {
      let ageFrom = form.value.ageFrom || 1
      let ageTo = form.value.ageTo || 18
      age = [ageFrom, ageTo].join(',')
    }
    if (form.value.levelFrom || form.value.levelTo) {
      let levelFrom = form.value.levelFrom || 1
      let levelTo = form.value.levelTo || 5
      level = [levelFrom, levelTo].join(',')
    }
    if (form.value.category != "all" || form.value.category != "" ) {
      tags = form.value.category
    }
    name = this.search && this.search.trim();

    this.taskCtrl.getTaskList({
      name,
      age,
      level,
      tags
    }).then(tasks => {
      console.log(tasks);
      loader.dismiss()
      this.navCtrl.push(SearchResultsPage, {tasks})
    })
  }
}
