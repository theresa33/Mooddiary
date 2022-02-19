import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale  } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  entries: any;

  public chartLabels: any = [];
  public chartValues: any = [];

  constructor(public data: DataService, private navCtrl: NavController,  public loading: LoadingController,) { }

  public newEntry(){
    this.entries = {
      title:'',
      mode:'',
      intensity:'',
      situation:''
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.defineChartData();
    this.lineChartMethod();
    console.log('haiihihoi')
  }


  defineChartData() {

    let k: any;

    this.data.getAllEntries().subscribe((res) => {
      this.entries = res;
      for (k in this.entries){
        var point = this.entries[k];
        this.chartLabels.push(point.mood);
        this.chartValues.push(point.intensity);
    }
    console.log(this.entries);
    console.log(this.chartLabels);
    })



  }

  lineChartMethod() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'My Dataset',
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
            data: this.chartValues,
            spanGaps: false,
          }
        ]
      }
    });
  }




}
