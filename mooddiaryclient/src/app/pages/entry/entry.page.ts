import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  public entry;

  constructor(public data: DataService, private navCtrl: NavController) {
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

  ngOnInit(): void {
    // let testEntry = {
    //   title: 'neuer test agian!',
    //   mood: 'gut',
    //   intensity: '8',
    //   situation: 'lalal'
    // };
    // this.data.insertNewEntry(testEntry).subscribe((res) => {
    //   console.log(res);
    // });

  }

  public goToEntry(){
    this.navCtrl.navigateForward('/entry');
  }
  public goToDashboard(){
    this.navCtrl.navigateForward('/dashboard');
  }
  //newantry page could be entry list page because home is currently the list
  public goToNewEntry(){
    this.navCtrl.navigateForward('/dashboard');
  }
  public goToEntryList(){
    this.navCtrl.navigateForward('/home');
  }
  public goToMedpack(){
    this.navCtrl.navigateForward('/medpack');
  }

  public insertNewEntry(entry){
    console.log(entry);
    //was passiert wenn man save button klickt (daten aus formular holen und dann in db speichern)
   this.data.insertNewEntry(entry).subscribe((res) => {
     console.log(res);
     this.entry = res;
    //nach speichern weiterleiten zu allen entries
    this.navCtrl.navigateForward('/home');
   })
    return entry;
  }
}


