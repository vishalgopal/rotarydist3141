import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-update-newsletter',
  templateUrl: './update-newsletter.page.html',
  styleUrls: ['./update-newsletter.page.scss'],
})
export class UpdateNewsletterPage implements OnInit {

  public form: FormGroup;
  public newsletterId :any;
  public details:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  constructor(
              public navCtrl: NavController,
               private _FB: FormBuilder,
               private http: HttpClient,
               private storage: Storage,
               private toastController :ToastController,
               private router :Router,
              private route: ActivatedRoute,
            ) 
  {
        this.newsletterId = this.route.snapshot.paramMap.get('id');
      
      
    this.http.get(SERVER_URL + '/api/getnewsletter/' + this.newsletterId)
      .subscribe((response: any) => {
        this.details = response;
        this.form.patchValue(response);
    });

      this.form = this._FB.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
   }
   submitEvent()
   {
     this.http.put(SERVER_URL + '/api/newsletter/'+this.details._id,this.form.value)
     .subscribe((responseUpdate: any) => {
       console.log(responseUpdate);
       this.presentToast("Newsletter Updated Successfully.");
       this.router.navigate(["/newsletters"]);
     });
   }
  ngOnInit() {
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
