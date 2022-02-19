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
  dateValue='';

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd HH:mm');
  }

  //zur ausgabe
  public dates: any;
  constructor(public data: DataService, private navCtrl: NavController) {
    this.newDate;
   }

   public newDate(){
    this.date = {
      isTaken: true,
      //ausgewähltes date von frontend holen und in takenDate speichern
      takenDate: this.dateValue,
    };
  }

  ngOnInit() {}

  ionViewDidEnter(){
    this.data.getAllDates().subscribe((res) => {
    console.log(res);
    this.dates = res;
  })}

  // pillTaken() {
  //   this.datetime.confirm(true);
  //   console.log(this.datetime);
  // }


  //insertnewdate einfügen wenn backend funktionert
  public insertNewDate(date){
    this.datetime.confirm(true);
    this.data.insertNewDate(date).subscribe((res) => {
      console.log(res);
      this.date = res;
      //neu laden damit datum aufscheint
      location.reload();
    })
    return date;
  }
}
