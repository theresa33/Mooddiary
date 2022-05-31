import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";

@Injectable({
providedIn: "root",
})

export class AuthGuard implements CanActivate {
constructor(private data: DataService, private navCtrl: NavController) {}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if (this.data.getLoggedIn() == false){
    this.navCtrl.navigateForward('/login')
    return;
  }


console.log('Auth Guard' + this.data.getLoggedIn());
return this.data.getLoggedIn();

}

}
