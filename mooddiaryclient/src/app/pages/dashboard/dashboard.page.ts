import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import toDate from 'date-fns/toDate';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { isThisHour } from 'date-fns';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas')  barCanvas: ElementRef;

  lineChart: any;
  barChart: any;

  entries: any;
  dates: any;

  public chartLabels: any = [];
  public chartValues: any = [];

  public chartValuesTwo: any = [];
  public chartLabelsTwo: any = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

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
      // this.lineChartMethodTwo();
      this.barChartMethod();

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
      this.chartLabelsTwo.push(point.created_at);
      this.chartValuesTwo.push(point.created_at);
  }
  console.log(this.chartLabelsTwo);
  })

}

// lineChartMethodTwo() {
//   Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale);
//   this.lineChartTwo = new Chart(this.lineCanvas2.nativeElement, {
//     type: 'line',
//     data: {
//       labels: this.chartLabelsTwo,
//       datasets: [
//         {
//           label: 'My Dataset',
//           fill: false,
//           //backgroundColor: 'rgba(93,211,158,0.4)',
//           borderColor: 'rgba(255,255,255,1)',
//           borderCapStyle: 'butt',
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: 'miter',
//           // pointBorderColor: 'rgba(75,192,192,1)',
//           // pointBackgroundColor: '#fff',
//           pointBorderWidth: 1,
//           pointHoverRadius: 5,
//         //  pointHoverBackgroundColor: 'rgba(9,22,141,1)',
//         //  pointHoverBorderColor: 'rgba(9,22,141,1)',
//           pointHoverBorderWidth: 2,
//           pointRadius: 1,
//           pointHitRadius: 10,
//           data: this.chartValuesTwo
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           type: 'time',
//           time: {
//             unit: 'hour',
//           }
//         },
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day'
//           }
//         }
//     }
//   }

//   });
// }
barChartMethod() {
  Chart.register(BarController, LineController, LineElement, PointElement, LinearScale, BarElement, Title, CategoryScale, TimeScale);
  // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: this.chartLabelsTwo,
      datasets: [{
        data: this.chartValuesTwo,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          time: {
            unit: this.chartLabelsTwo,
            displayFormats: {
              'minute': 'HH-ss',
              'hour': 'HH-ss',
            }
          }

        },

        y: {
          type: 'time',
          time: {
            displayFormats: {
              'millisecond': 'HH-ss',
              'second': 'HH-ss',
              'minute': 'HH-ss',
              'hour': 'HH-ss',
              'day': 'HH-ss',
              'week': 'HH-ss',
              'month': 'HH-ss',
              'quarter': 'HH-ss',
              'year': 'HH-ss',
            }
          }

        }
      }

    }
  });
}

}
