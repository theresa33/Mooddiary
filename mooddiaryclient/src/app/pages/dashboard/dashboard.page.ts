import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale  } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;

  constructor(public data: DataService, private navCtrl: NavController, private elementRef: ElementRef, ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  lineChartMethod() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }


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



}
