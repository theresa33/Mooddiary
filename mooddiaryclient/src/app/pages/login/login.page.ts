import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user;

  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController, public alertController: AlertController) {
    this.login();
  }

  public login(){
    this.user = {
      email: '',
      password: ''
    };
  }
  ngOnInit() { }

  public async loginUser(user){
    if(user.email == '' || user.password == ''){
      console.log('Invalid user');
      const toast = await this.toastController.create({
        message: 'Please insert every aspect.',
        color: 'danger',
        position: 'bottom',
        duration: 2000,
        });
        toast.present();
      return;
    }
    this.data.loginUser(user).subscribe(async (res) => {
      console.log(res);
      this.user = res;
      this.data.setLoggedIn(true);

      this.navCtrl.navigateForward('tabs/tablinks/home');
      const toast = await this.toastController.create({
      message: 'Loged in successfully',
      color: 'success',
      position: 'bottom',
      duration: 2000,
    });
    toast.present();
    })
  }


  async infoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Info!',
      subHeader: 'This is a mood diary where you can write and manage entries. There is also a pill taking function and a dashboard with charts.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  async helpAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SOS!',
      subHeader: 'If you are dealing with crisis it is important that you talk to a person you feel safe with. ',
      message: ' 0800 111 0 550 Nummmer gegen Kummer \n 142 Telefon Seelsorge',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }
}
