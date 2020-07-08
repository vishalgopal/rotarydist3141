import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-update-rmb',
  templateUrl: './update-rmb.page.html',
  styleUrls: ['./update-rmb.page.scss'],
})
export class UpdateRmbPage implements OnInit {
  public form: FormGroup;
  public rmbId :any;
  public rmbDetails:any;

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
        this.rmbId = this.route.snapshot.paramMap.get('id');
      
      
    this.http.get(SERVER_URL + '/api/getrmb/' + this.rmbId)
      .subscribe((response: any) => {
        this.rmbDetails = response;
        this.form.patchValue(response);
    });

      this.form = this._FB.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      details: ['',Validators.required],
      link: ['', Validators.required]
    });
   }
   submitEvent()
   {
     this.http.put(SERVER_URL + '/api/rmb/'+this.rmbDetails._id,this.form.value)
     .subscribe((responseUpdate: any) => {
       console.log(responseUpdate);
       this.presentToast("Yellow Page Updated Successfully.");
       this.router.navigate(["/rmb"]);
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
