import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  public newEntry(){
    this.entry = {
      title:'',
      mode:'',
      intensity:'',
      situation:''
    };
  }

  ngOnInit(): void {}

  goToEntryList() {
    this.navCtrl.navigateBack('/tablinks/home');
  }

  public async insertNewEntry(entry){
    if(entry.title == '' || entry.mood == '' || entry.intensity == '' || entry.situation == '') {
      console.log('Invalid entry');
      const toast = await this.toastController.create({
        message: 'Please insert every aspect.',
        color: 'danger',
        position: 'middle',
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
    this.navCtrl.navigateForward('/tablinks/home');
    const toast = await this.toastController.create({
      message: 'Please insert every aspect.',
      color: 'danger',
      position: 'middle',
      duration: 2000,
      });
      toast.present();


   })
  }
}


