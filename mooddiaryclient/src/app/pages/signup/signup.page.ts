import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public user;

  constructor(public data: DataService, private navCtrl: NavController, public toastController: ToastController) {
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

}
