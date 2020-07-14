import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-addbanner',
  templateUrl: './addbanner.page.html',
  styleUrls: ['./addbanner.page.scss'],
})
export class AddbannerPage implements OnInit {

  public form: FormGroup;
  selectedFile: File;
  responseCreateId:any;
  img1: any = "";
  public userid:any;

  constructor( public navCtrl: NavController,
               private _FB: FormBuilder,
               private http: HttpClient,
               private storage: Storage,
               private toastController :ToastController,
               private router :Router) {
                this.storage.get('userid').then((userid) => {
                  this.userid = userid;
                });
                this.form = this._FB.group({
                  image: ['', Validators.required]
               });
                }

  ngOnInit() {
  }

  onFileChange(event, field) {
    // this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedFile = event.target.files[0];

    // console.log("onchange"+JSON.parse(event.target.files[0]));
      // just checking if it is an image, ignore if you want
      const reader = new FileReader();
      reader.onload = (event: any) => {
          this.img1 = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitEvent()
  {
    const uploadData = new FormData();
    console.log("subrde"+JSON.stringify(this.selectedFile));
    if(this.selectedFile){
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.http.post(SERVER_URL + '/api/banner',uploadData)
    .subscribe((responseUpdate: any) => {
      console.log(responseUpdate);
      this.presentToast("Banner created Successfully.");
      this.router.navigate(["/banner"]);
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
