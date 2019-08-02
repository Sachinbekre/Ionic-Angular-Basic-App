import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  public username: string;
  public password: string;
  isLoading = false;
  isLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCntrl: LoadingController
  ) {}

  ngOnInit() {}
  onLogin() {
    this.isLoading = true;
    this.loadingCntrl
      .create({ keyboardClose: true, message: 'Loading in...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          this.authService.login();
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 2000);
      });
  }
  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    form.reset();
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    if (this.isLogin) {
      // send a request a Login Server
    } else {
      // send a request signup server
    }
  }
}
