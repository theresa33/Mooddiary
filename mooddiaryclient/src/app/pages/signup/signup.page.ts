import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public user;
  alertController: any;

  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController, public alterController: AlertController) {
    this.newUser();
  }

  public newUser(){
    this.user = {
      username:'',
      email:'',
      password:''
    };
  }

  ngOnInit() {}

  async registerNewUser(user){
    if(user.username == '' || user.email == '' || user.password == ''){
      console.log('Invalid user details');
      const toast = await this.toastController.create({
        message: 'Please insert every aspect.',
        color: 'danger',
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
      return;
    }
    this.data.insertNewUser(user).subscribe(async (res) => {
      console.log(res);
      this.user = res;
      this.newUser();

      this.navCtrl.navigateForward('/tabs/tablinks/home');
      const toast = await this.toastController.create({
        message: 'Successfully registered :)',
        color: 'success',
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
    })

  }

  async infoAlert() {
    const alert = await this.alterController.create({
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
    const alert = await this.alterController.create({
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
