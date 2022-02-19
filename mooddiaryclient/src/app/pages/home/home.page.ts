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
  public id;
  constructor(public data: DataService, private navCtrl: NavController) {
  }

  ngOnInit() {}

  ionViewDidEnter(){
    this.data.getAllEntries().subscribe((res) => {
    console.log(res);
    this.entries = res;
  })}


  public goToEntryDetails(entry) {
    this.data.currentEntry = entry;
    this.navCtrl.navigateForward('tablinks/entry-list');
    console.log(entry);
  }

  public deleteEntrybyID(id) {
    //stimmmt nicht
    this.data.deleteEntrybyID(id).subscribe((res) => {
      this.entries = this.entries.filter(e => {
        return e.id != id
      })
      this.id = res;
      this.id.delete;
    })
  }
}
