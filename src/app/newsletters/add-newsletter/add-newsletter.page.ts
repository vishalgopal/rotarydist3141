import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.page.html',
  styleUrls: ['./add-newsletter.page.scss'],
})
export class AddNewsletterPage implements OnInit {

  public form: FormGroup;

  constructor( public navCtrl: NavController,
               private _FB: FormBuilder,
               private http: HttpClient,
               private storage: Storage,
               private toastController :ToastController,
               private router :Router) {
                this.form = this._FB.group({
                  title: ['', Validators.required],
                  description: ['', Validators.required]
               });
                }

  ngOnInit() {
  }
  submitEvent()
  {
    this.http.post(SERVER_URL + '/api/newsletter',this.form.value)
    .subscribe((responseUpdate: any) => {
      console.log(responseUpdate);
      this.presentToast("Newsletter created Successfully.");
      this.router.navigate(["/newsletters"]);
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
