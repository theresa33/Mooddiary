import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-medpack',
  templateUrl: './medpack.page.html',
  styleUrls: ['./medpack.page.scss'],
})
export class MedpackPage implements OnInit {
 public date;

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;


  public dates: any;
  constructor(public data: DataService, private navCtrl: NavController) { }

  ngOnInit() {}

  goToCalendar() {
    this.navCtrl.navigateBack('/tablinks/dashboard');
  }

  ionViewDidEnter(){
    this.data.getAllDates().subscribe((res) => {
   // console.log(res);
    this.dates = res;
  })}



  public insertNewDate(date){
    this.data.insertNewDate(date).subscribe((res) => {
     // console.log(res);
      location.reload();
    })
  }

}
