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
  goToEntryList() {
    this.navCtrl.navigateBack('/tablinks/home');
  }

  public insertNewEntry(entry){
   this.data.insertNewEntry(entry).subscribe((res) => {
     console.log(res);
     this.entry = res;
    //nach speichern weiterleiten zu allen entries
    this.navCtrl.navigateForward('/tablinks/home');
   })
    return entry;
  }
}


