import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import toDate from 'date-fns/toDate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;

  lineChart: any;
  lineChart2: any;

  entries: any;
  dates: any;

  public chartLabels: any = [];
  public chartValues: any = [];

  public chartValues2: any = [];
  public chartLabels2: any = [];

  constructor(public data: DataService, private navCtrl: NavController,  public loading: LoadingController,) { }

  public newEntry(){
    this.entries = {
      title:'',
      mode:'',
      intensity:'',
      situation:''
    };
  }

  public newDate(){
    this.dates = {
      created_at: ''
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.defineChartData();
    this.lineChartMethod();

    this.defineChartDate();
    this.lineChartMethodtwo();
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
            //backgroundColor: 'rgba(93,211,158,0.4)',
            borderColor: 'rgba(255,255,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
           // pointBorderColor: 'rgba(75,192,192,1)',
           // pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
          //  pointHoverBackgroundColor: 'rgba(9,22,141,1)',
          //  pointHoverBorderColor: 'rgba(9,22,141,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.chartValues,
            spanGaps: false,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
          }
        }

      }
    });
  }

//--------------------ZWEITES CHART------------------------
defineChartDate() {

  let k: any;

  this.data.getAllDates().subscribe((res) => {
    this.dates = res;
    for (k in this.dates){
      var point = this.dates[k];
      this.chartLabels2.push(point.created_at);
      this.chartValues2.push(point.created_at);
  }
  console.log(this.dates);
  console.log(this.chartLabels2);
  })

}

lineChartMethodtwo() {
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale);
  this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
    type: 'line',
    data: {
      labels: this.chartLabels2,
      datasets: [
        {
          label: 'My Dataset',
          fill: false,
          //backgroundColor: 'rgba(93,211,158,0.4)',
          borderColor: 'rgba(255,255,255,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
        //  pointHoverBackgroundColor: 'rgba(9,22,141,1)',
        //  pointHoverBorderColor: 'rgba(9,22,141,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.chartValues2
        }
      ]
    },
    options: {
      scales: {
        y: {
          type: 'time',
          time: {
            unit: 'hour',
          }
        },
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        }
    }
  }

  });
}



}
