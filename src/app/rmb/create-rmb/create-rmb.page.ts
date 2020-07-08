import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-rmb',
  templateUrl: './create-rmb.page.html',
  styleUrls: ['./create-rmb.page.scss'],
})
export class CreateRmbPage implements OnInit {
  public form: FormGroup;

  constructor( public navCtrl: NavController,
               private _FB: FormBuilder,
               private http: HttpClient,
               private storage: Storage,
               private toastController :ToastController,
               private router :Router) {
                this.form = this._FB.group({
                  title: ['', Validators.required],
                  description: ['', Validators.required],
                  details: ['',Validators.required],
                  link: ['', Validators.required]
               });
                }

  ngOnInit() {
  }
  submitEvent()
  {
    this.http.post(SERVER_URL + '/api/rmb',this.form.value)
    .subscribe((responseUpdate: any) => {
      console.log(responseUpdate);
      this.presentToast("Yellow Page created Successfully.");
      this.router.navigate(["/rmb"]);
    });
  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
