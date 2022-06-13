import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  public entry;

  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController) {
    this.newEntry();
  }

  @ViewChild('radioGroup') radioGroup: IonRadioGroup

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  public newEntry(){
    this.entry = {
      title:'',
      mood:'',
      intensity:'',
      situation:''
    };
  }

  ngOnInit(): void {}

  goToEntryList() {
    this.navCtrl.navigateBack('tabs/tablinks/home');
  }

  public async insertNewEntry(entry){
    if(entry.title == '' || entry.mood == '' || entry.intensity == '' || entry.situation == '') {
      console.log('Invalid entry');
      const toast = await this.toastController.create({
        message: 'Please insert every aspect.',
        color: 'danger',
        position: 'bottom',
        duration: 2000,
        });
        toast.present();
      return;
    }
   this.data.insertNewEntry(entry).subscribe(async (res) => {
     console.log(res);
     this.entry = res;
     this.newEntry();
    //nach speichern weiterleiten zu allen entries
    this.navCtrl.navigateForward('tabs/tablinks/home');
    const toast = await this.toastController.create({
      message: 'Entry successfully added!',
      color: 'success',
      position: 'bottom',
      duration: 2000,
      });
      toast.present();


   })
  }
  //------------------------------------------------


  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'Sehr gut',
      text: 'Very Good',
      disabled: false,
      checked: false,
      color: 'secondary',
      icon: '😁'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'Gut',
      text: 'Good',
      disabled: false,
      checked: true,
      color: 'secondary',
      icon: '🙂'
    }, {
      id: '3',
      name: 'radio_list',
      value: 'Okey',
      text: 'Bad',
      disabled: false,
      checked: false,
      color: 'primary',
      icon: '😐'
    },
    {
      id: '4',
      name: 'radio_list',
      value: 'Schlecht',
      text: 'Bad',
      disabled: false,
      checked: false,
      color: 'danger',
      icon: '☹️'
    },
    {
      id: '5',
      name: 'radio_list',
      value: 'Sehr schlecht',
      text: 'Bad',
      disabled: false,
      checked: false,
      color: 'danger',
      icon: '😭'
    },
  ];

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }


  selectTwo() {
    this.radioGroup.value = 'radio_2'
  }


}


