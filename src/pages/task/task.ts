import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Card } from './../../models/Card';
import { Task } from './../../models/Task';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech'

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
    public alertCtrl: AlertController,
    private tts: TextToSpeech
  ) {
    this.task = navParams.get('task')
    this.cards = this.shuffle(this.task.cards.slice())
    dragulaCtrl.drag.subscribe(val => {
    })
    dragulaCtrl.shadow.subscribe(val => {
    })
    dragulaCtrl.drop.subscribe(val => {
      // let id = val[1].attributes.idx.value;
      // let possition = this.getPosition(id, this.cards)
      for(let i = 0; i<this.cards.length;i++){
        if(this.isPossitionRight(this.cards[i]._id)){
          this.cards[i].position = true
        }else{
          this.cards[i].position = false
        }
      }
      console.log(this.getMetric(this.cards, this.task.cards));
      if (this.isGoalState(this.cards, this.task.cards)) {
        let alert = alertCtrl.create({
          title: 'Συγχαρητήρια Κέρδισες!',
          message: 'Όλες οι σελίδες είναι στην σωστή σειρά!',
          buttons: [
            {
              text: 'Επιστροφή στα Παιχνίδια',
              handler: () => {
                alert.dismiss().then(_ => {
                  navCtrl.popToRoot()
                })
                return false
              }
            },
            {
              role: 'cancel',
              text: 'Δοκίμασε ξανά',
              handler: () => {
                for(let i = 0; i<this.cards.length;i++){
                  if(this.isPossitionRight(this.cards[i]._id)){
                    this.cards[i].position = true
                  }else{
                    this.cards[i].position = false
                  }
                }
                this.shuffle(this.cards)
              }
            }
          ]
        })
        alert.present()
      }
      // let position = this.getPosition(val[1].attributes.idx.value)
      // console.log(position);
    })
  }

  ionViewDidLoad() {
    this.tts.speak('Γεια σου. Τι κάνεις;').then(()=>{
      console.log('success')
    })
    .catch(error=>{
      console.log(error);
      
    })
    console.log('ionViewDidLoad TaskPage');
  }

  shuffle(array) {
    if (array.length === 1) {
      return array
    }
    while (this.isGoalState(array, this.task.cards)) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
    }
    return array;
  }

  getPosition(id: string, cards: Card[]): number {
      return cards.findIndex(item => {
      return item._id === id
    })
  }

  isPossitionRight(id: string):boolean{
    return this.getPosition(id, this.cards) === this.getPosition(id, this.task.cards)
  }

  getMetric(cards: Card[], goal: Card[]): number {
    let right: number = 0;
    let wrong: number = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i]._id == goal[i]._id) {
        right += 1;
      } else {
        wrong += 1;
      }
    }
    return right / (cards.length)
  }

  isGoalState(cards: Card[], goal: Card[]): boolean {
    return this.getMetric(cards, goal) == 1
  }
}
