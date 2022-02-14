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
  dateValue = '';

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd HH:mm');
  }

  public dates: any;
  constructor(public data: DataService, private navCtrl: NavController) {
    this.newDate;
   }

   public newDate(){
    this.date = {
      isTaken:'true',
      takenDate:'',
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
    })
  }


  // changeStatus(){
  //   if(this.toggled){
  //     this.buttonColor = '#907F9F';
  //     this.toggled = true;
  //   }
  //   else{
  //         this.buttonColor = '#0C0C0C'; //hex code for previous color
  //         this.toggled = false;
  //   }
  // }




  public goToDashboard(){
    this.navCtrl.navigateForward('/dashboard');
  }
  //newantry page could be entry list page because home is currently the list
  public goToNewEntry(){
    this.navCtrl.navigateForward('/entry');
  }
  public goToEntryList(){
    this.navCtrl.navigateForward('/home');
  }
  public goToMedpack(){
    this.navCtrl.navigateForward('/medpack');
  }

  public goToEntryDetails(entry) {
    this.data.currentEntry = entry;
    this.navCtrl.navigateForward('/entry-list');
    console.log(entry);
  }


}
