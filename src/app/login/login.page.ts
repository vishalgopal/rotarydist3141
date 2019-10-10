import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Login: any;
  stepOne = true;
  stepTwo = false;
  loginForm: FormGroup;
  userId: any;
  constructor(private http: HttpClient,
              private router: Router,
              private _FB: FormBuilder,
              public toastController: ToastController,
              private storage: Storage) {
    this.loginForm = this._FB.group({
      mobile: ['', Validators.required],
      otp: ['', Validators.required],
    });
   }

   async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.storage.get('username').then((usrid) => {
      if (usrid) {
      this.router.navigate(['/dashboard']);
      this.presentToast ('Login Successfull');
      }
    });
  }

  finduser() {
    this.http.put(SERVER_URL + '/api/finduser', this.loginForm.value)
    .subscribe(
      (responseCreate: any) => {
         this.stepOne = false;
         this.stepTwo = true;
         this.presentToast ('OTP Sent');
      },
      error => this.presentToast (error.error.message)
     );
  }

  validateuser() {
    this.http.put(SERVER_URL + '/api/validateuser', this.loginForm.value)
    .subscribe((responseCreate: any) => {
         this.stepOne = false;
         this.stepTwo = false;
         this.storage.set('clubid', responseCreate[0].club);
         this.storage.set('username', responseCreate[0].name.first + ' ' + responseCreate[0].name.last);
         this.storage.set('userid', responseCreate[0]._id);
         this.storage.set('district', responseCreate[0].district);
         this.storage.set('clubDesignation', responseCreate[0].rotaryDetails.clubDesignation);
         this.storage.set('districtDesignation', responseCreate[0].rotaryDetails.districtDesignation);
        //  this.storage.set('districtDesignation', 'member');
        console.log(responseCreate[0]._id);
         this.presentToast ('Login Successfull');
         const navigationExtras: NavigationExtras = {
          state: {
            userid: responseCreate[0]._id
          }
        };
         this.router.navigate(['/dashboard'], navigationExtras);
     },
     error => this.presentToast (error.error.message)
    );
  }

}
