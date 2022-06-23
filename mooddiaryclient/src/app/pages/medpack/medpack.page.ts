import { Component, HostListener, OnInit, Query, ViewChild } from '@angular/core';
import { IonDatetime, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-medpack',
  templateUrl: './medpack.page.html',
  styleUrls: ['./medpack.page.scss'],
})
export class MedpackPage implements OnInit {
 public date;
 public user;
 public id;

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;


  public dates: any;
  constructor(public toastController: ToastController, public data: DataService, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {}

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }

  ionViewDidEnter(){
    this.data.getDatesByUser().subscribe((res) => {
    this.dates = res;
   // ausgabe nach zeitpunkt sortieren
    this.dates.sort((a: any, b: any) => {
      return <any>new Date(b.created_at) - <any>new Date(a.created_at);
    });
});
  console.log(this.dates);
}


  public insertNewDate(date){
    this.data.insertNewDate(date).subscribe((res) => {
      location.reload();
    })
  }

  public async logoutUser(user){
    this.data.logoutUser(user).subscribe(async(res) => {
    console.log('ausloggen')
    this.data.setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateForward('/login');
    const toast = await this.toastController.create({
      message: 'You are successfully logged out',
      color: 'success',
      position: 'bottom',
      duration: 2000,
      });
      toast.present();

    })
  }

  public deleteDatebyID(id) {
    this.data.deleteDatebyID(id).subscribe(async (res) => {
      this.dates = this.dates.filter(e => {
        return e.id != id
      })
      this.id = res;
      this.id.delete;
      const toast = await this.toastController.create({
        message: 'Date successfully deleted!',
        color: 'success',
        position: 'bottom',
        duration: 2000,
        });
        toast.present();
    })
  }

}
