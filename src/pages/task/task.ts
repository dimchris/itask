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
  cards: Card[];
  gamestart: boolean = false;
  help;
  dropSubscription;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dragulaCtrl: DragulaService,
    public alertCtrl: AlertController,
    private tts: TextToSpeech
  ) {
    this.task = navParams.get('task')
    this.cards = this.shuffle(this.task.cards.slice())
    // dragulaCtrl.drag.subscribe(val => {
    // })
    // dragulaCtrl.shadow.subscribe(val => {
    // })
    this.dropSubscription = dragulaCtrl.drop.subscribe(val => {
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
      if(this.getMetric(this.cards, this.task.cards)>0.5){
        this.tts.speak({
          text: 'Τα πας πολύ καλά! Συνέχισε έτσι!',
          locale:'el-GR'
        })
      }
      if(this.getMetric(this.cards, this.task.cards)>0.8){
        this.tts.speak({
          text: 'Είσαι πολύ κοντά στη νίκη!',
          locale:'el-GR'

        })
      }
      if(this.getMetric(this.cards, this.task.cards)<0.4){
        this.tts.speak({
          text: 'Προσπάθησε περισσότερο! Σίγουρα θα τα καταφέρεις!',
          locale:'el-GR'

        })
      }
      
      if (this.isGoalState(this.cards, this.task.cards)) {
        let message = `Συγχαρητήρια Κέρδισες! Όλες οι κάρτες είναι στην σωστή σειρά! Μπορείς να παίξεις ξανά το ίδιο παιχνίδι ή να δοκιμάσεις ένα καινούργιο!`
        this.tts.speak({text:message,locale:'el-GR'}).then(()=>{
          this.gamestart = true;
        })
        .catch(error=>{
          console.log(error);
          
        })
        let alert = alertCtrl.create({
          title: 'Συγχαρητήρια!',
          message: 'Όλες οι κάρτες είναι στην σωστή σειρά!',
          buttons: [
            {
              text: 'Επιστροφή στα Παιχνίδια',
              handler: () => {
                this.tts.speak('')
                alert.dismiss().then(_ => {
                  navCtrl.popAll();
                })
                return false
              }
            },
            {
              role: 'cancel',
              text: 'Δοκίμασε ξανά',
              handler: () => {
                this.tts.speak('');
                for(let i = 0; i<this.cards.length;i++){
                  this.cards[i].position = false;
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
    let message = `Καλωσήρθες στο παιχνίδι ${this.task.name}! 
    Σκοπός του παιχνιδιού είναι να βάλεις τις κάρτες στη σωστή σειρά!
    ${this.task.description}`;
    this.help = this.alertCtrl.create({
      title: 'Καλωσήρθες!',
      message,
      buttons: [
        {
          text: 'ΟΚ!',
          handler: () =>{
            this.tts.speak('');
            message = `Μπροστάσ σου έχεις ${this.cards.length} κάρτες.`;
            message += this.cards.map(card => card.name).join(',')
            message += '. Βάλε τις κάρτες στη σωστή σειρά!'
            message += 'Πάτησε πάνω στις κάρτες για να ακούσεις την περιγραφή τους.'
            this.tts.speak({
              text:message,
              locale:'el-GR'
            })
          }
        }
      ]
    });
    this.help.present();
    this.tts.speak({text:message, locale:'el-GR'}).then(()=>{
      this.gamestart = true;
    })
    .catch(error=>{
      console.log(error);
      
    })
    console.log('ionViewDidLoad TaskPage');
  }

  ionViewWillUnload(){
    if(this.dragulaCtrl){
      console.log('unsub');     
      this.dropSubscription.unsubscribe();
    }
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
  onTap(card: Card){
    let message = card.name;
    console.log(card);
    this.tts.speak('');
    this.tts.speak({text:message,locale:'el-GR'}).then(()=>{
    })
    .catch(error=>{
      console.log(error);
      
    })


  }

  onHelp(){
    let message = `Καλωσήρθες στο παιχνίδι ${this.task.name}! 
    Σκοπός του παιχνιδιού είναι να βάλεις τις κάρτες στη σωστή σειρά και έτσι να κερδίσεις!
    ${this.task.description}`;
    this.help = this.alertCtrl.create({
      title: 'Καλωσήρθες!',
      message,
      buttons: [
        {
          text: 'ΟΚ!',
          handler: () =>{
            this.tts.speak('');
            message = `Μπροστά σου έχεις ${this.cards.length} κάρτες.`;
            message += this.cards.map(card => card.name).join(',')
            message += '. Βάλε τις κάρτες στη σωστή σειρά!'
            message += 'Πάρα πάνω στις κάρτες για να ακούσεις την περιγραφή τους.'
            this.tts.speak({
              text:message,
              locale:'el-GR'
            })
          }
        }
      ]
    });
    this.help.present();
    this.tts.speak({text:message, locale:'el-GR'}).then(()=>{
      this.gamestart = true;
    })
    .catch(error=>{
      console.log(error);
      
    })  }
}
