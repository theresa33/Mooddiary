import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user;

  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController) {
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
}
