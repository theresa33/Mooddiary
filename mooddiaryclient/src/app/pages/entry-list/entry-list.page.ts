import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.page.html',
  styleUrls: ['./entry-list.page.scss'],
})
export class EntryListPage implements OnInit {

  public currentEntry;
  public id;
  constructor(private data: DataService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  public ionViewDidEnter(){
    if(this.data.currentEntry){
      this.currentEntry = this.data.currentEntry;
    }
  }

  public goToEntryList(){
    this.navCtrl.navigateForward('tablinks/home');
  }

  // public deleteEntrybyID(id){
  //   //da ist noch was falsch aaaaaaah
  //   this.data.deleteEntrybyID(id).subscribe((res) => {
  //   console.log('ist gelöscht');
  //   this.id = res;
  //   this.navCtrl.navigateForward('tablinks/home');
  // })}

  // public deleteEntrybyID(id) {
  //   // this.data.deleteEntrybyID(id).subscribe((res) => {
  //   //   this.navCtrl.navigateForward('tablinks/home');

  //   // })
  // }

}
