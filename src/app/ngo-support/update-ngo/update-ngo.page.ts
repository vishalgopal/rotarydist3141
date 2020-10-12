import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-update-ngo',
  templateUrl: './update-ngo.page.html',
  styleUrls: ['./update-ngo.page.scss'],
})
export class UpdateNgoPage implements OnInit {

  public form: FormGroup;
  public ngoId :any;
  public ngoDetails:any;
  img1: any = "assets/placeholder.jpg";
  selectedFile: File;
  responseCreateId:any;
  serverURL = SERVER_URL;

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
        this.ngoId = this.route.snapshot.paramMap.get('id');
      
      
    this.http.get(SERVER_URL + '/api/getNgo/' + this.ngoId)
      .subscribe((response: any) => {
        this.ngoDetails = response;

        if(this.ngoDetails.image != '' && this.ngoDetails.image != null)
        {
          this.img1 =  this.serverURL+"/images/"+this.ngoDetails.image;
        }

        this.form.patchValue(response);
        console.log(this.ngoDetails);
    });

      this.form = this._FB.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      details: ['',Validators.required],
      link: ['', Validators.required],
      image: [null]
    });
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
      
     this.http.put(SERVER_URL + '/api/ngo/'+this.ngoDetails._id,this.form.value)
     .subscribe((responseUpdate: any) => {

        if(this.selectedFile){
          this.responseCreateId = responseUpdate;
          this.http.put(SERVER_URL + '/api/ngoImage/' + this.responseCreateId, uploadData)
          .subscribe((responseUpdate: any) => {
                  console.log('Updated with image! '+this.responseCreateId);
            });
        }
        
       console.log(responseUpdate);
       this.presentToast("NGO Updated Successfully.");
      //  this.router.navigate(["/ngo-support"]);
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
