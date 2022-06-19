import { Component, HostListener, OnInit, Query, ViewChild } from '@angular/core';
import { IonDatetime, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { format, parseISO } from 'date-fns';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-medpack',
  templateUrl: './medpack.page.html',
  styleUrls: ['./medpack.page.scss'],
})
export class MedpackPage implements OnInit {
 public date;

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;


  public dates: any;
  constructor(public data: DataService, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {}

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }

  ionViewDidEnter(){
    this.data.getDatesByUser().subscribe((res) => {
    this.dates = res;
    //ausgabe nach zeitpunkt sortieren
    this.dates.sort((a: any, b: any) => {
      return <any>new Date(b.created_at) - <any>new Date(a.created_at);
    });
  })
}


  public insertNewDate(date){
    this.data.insertNewDate(date).subscribe((res) => {
      location.reload();
    })
  }

}
