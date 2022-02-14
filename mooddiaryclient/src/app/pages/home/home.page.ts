import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public entries: any;
  constructor(public data: DataService, private navCtrl: NavController) {
  }

  ngOnInit() {}

  ionViewDidEnter(){
    this.data.getAllEntries().subscribe((res) => {
    console.log(res);
    this.entries = res;
  })}


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

  // public deleteEntry(entry){
  //   this.data.deleteEntry(entry);
  // }
}
