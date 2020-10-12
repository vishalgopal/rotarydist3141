import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-add-ngo',
  templateUrl: './add-ngo.page.html',
  styleUrls: ['./add-ngo.page.scss'],
})

export class AddNgoPage implements OnInit {
  public form: FormGroup;
  img1: any = "assets/placeholder.jpg";
  selectedFile: File;
  responseCreateId:any;


  
  constructor( public navCtrl: NavController,
               private _FB: FormBuilder,
               private http: HttpClient,
               private storage: Storage,
               private toastController :ToastController,
               private router :Router) 
               {
                  this.form = this._FB.group({
                    title: ['', Validators.required],
                    description: ['', Validators.required],
                    details: ['',Validators.required],
                    link: ['', Validators.required],
                    image: [null],
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

    this.http.post(SERVER_URL + '/api/ngo',this.form.value)
    .subscribe((responseUpdate: any) => {
      if(this.selectedFile){
        this.responseCreateId = responseUpdate;
        this.http.put(SERVER_URL + '/api/ngoImage/' + this.responseCreateId, uploadData)
        .subscribe((responseUpdate: any) => {
                console.log('Updated with image! '+this.responseCreateId);
          });
       }

      console.log(responseUpdate);
      this.presentToast("NGO created Successfully.");
      this.router.navigate(["/ngo-support"]);
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
