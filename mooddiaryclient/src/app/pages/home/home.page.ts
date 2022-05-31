import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public entries: any;
  public id;
  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController) {
  }

  ngOnInit() {}

  ionViewDidEnter(){
    this.data.getAllEntries().subscribe((res) => {
    console.log(res);
    this.entries = res;
    //ausgabe nach zeitpunkt sortieren
    this.entries.sort((a: any, b: any) => {
      return <any>new Date(b.created_at) - <any>new Date(a.created_at);
    });
  })}


  public goToEntryDetails(entry) {
    this.data.currentEntry = entry;
    this.navCtrl.navigateForward('/tabs/tablinks/entry-list');
    console.log(entry);
  }

  public deleteEntrybyID(id) {
    //stimmmt nicht
    this.data.deleteEntrybyID(id).subscribe(async (res) => {
      this.entries = this.entries.filter(e => {
        return e.id != id
      })
      this.id = res;
      this.id.delete;
      const toast = await this.toastController.create({
        message: 'Entry successfully deleted!',
        color: 'success',
        position: 'bottom',
        duration: 2000,
        });
        toast.present();
    })
  }

  public async LoggedOut() {
    console.log('ausloggen')
    this.navCtrl.navigateForward('/login');
    localStorage.removeItem('isLoggedIn');
    const toast = await this.toastController.create({
      message: 'You are successfully logged out',
      color: 'success',
      position: 'bottom',
      duration: 2000,
      });
      toast.present();
  }

}
