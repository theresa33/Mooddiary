import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

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
    initialSlide: 0,
    speed: 400,
  };

  constructor(public toastController: ToastController, public data: DataService, private navCtrl: NavController,  public loading: LoadingController,) { }

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
      this.barChartMethod();

  }


  defineChartData() {

    let k: any;

    this.data.getEntriesByUser().subscribe((res) => {
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
            borderColor: 'rgba(255,255,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
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


// defineChartDate() {

//   let k: any;

//   this.data.getDatesByUser().subscribe((res) => {
//     this.dates = res;
//     for (k in this.dates){
//       var point = this.dates[k];
//       this.chartLabelsTwo.push(point.created_at);
//       this.chartValuesTwo.push(point.created_at);
//   }

//   console.log(this.chartLabelsTwo);
//   })

// }
defineChartDate() {

  let k: any;
  var date;

  this.data.getEntriesByUser().subscribe((res) => {
    this.dates = res;
    for (k in this.dates){
      var point = this.dates[k];
      this.chartLabelsTwo.push(point.created_at);
      this.chartValuesTwo.push(point.intensity);
  }
  })

}

barChartMethod() {
  Chart.register(BarController, LineController, LineElement, PointElement, LinearScale, BarElement, Title, CategoryScale, TimeScale);
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: this.chartLabelsTwo,
      // labels: [14.06, 15.06, 16.06, 17.06],
      datasets: [{
        data: this.chartValuesTwo,
        backgroundColor: [
          'rgba(41,115,115, 0.9)',
        ],
        borderColor: [
          'rgba(41, 115, 115, 0.9)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {

          // type: 'time',
          // time: {
          //     displayFormats: {
          //         quarter: 'MMM YYYY'
          //     }
          // }

        },

        y: {
          // type: 'time',
          // time: {
          //     displayFormats: {
          //         quarter: 'MMM YYYY'
          //     }
          // }

        }
      }

    }
  });
}

public async logoutUser(user){
  this.data.logoutUser(user).subscribe(async(res) => {
  console.log('ausloggen')
  this.data.setLoggedIn(false);
  localStorage.removeItem('isLoggedIn');
  this.navCtrl.navigateForward('/login');
  const toast = await this.toastController.create({
    message: 'You are successfully logged out',
    color: 'success',
    position: 'bottom',
    duration: 2000,
    });
    toast.present();

  })
}

}

