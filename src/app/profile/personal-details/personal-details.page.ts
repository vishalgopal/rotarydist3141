import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../../service/loader.service';
// Rest API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {
  items: any;
  mobile: any;
  personalData: any;
  userid: String;
  serverURL = SERVER_URL;
  username: any;
  public form: FormGroup;
  img1: any = "assets/images/defaultProfPic.png";
  selectedFile: File;
  responseCreateId:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
    })
  }

  constructor(private loader: LoaderService, private _FB: FormBuilder, private router: Router, private http: HttpClient, private storage: Storage,
    public toastController: ToastController) { 
        
  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
      this.storage.get('userid').then((usrid) => {
        console.log("usrid : "+usrid );
        this.userid = usrid;
        this.userGet();
      });
      
          this.form = this._FB.group({
            name: this._FB.group({
              last: ['', Validators.required],
              first: ['', Validators.required],
              fullName:['',Validators.required],
            }),
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            birthDate: [''],
            anniversaryDate: [''],
            bloodGroup: [''],
            alternateMobile: [''],
            about: [''],
            image: [null, Validators.required],
            address: this._FB.group({ // make a nested group
              addressLine1: [''],
              addressLine2: [''],
              city: [''],
              state: [''],
              pincode: [''],
            }),
      });
  } 

  manage() {
    console.dir("aghjg");
 }

  userGet() {
    console.log("userid : "+this.userid );
    this.http.get(SERVER_URL + '/api/getuser/' + this.userid)
    .subscribe((response: any) => {
      this.items = response[0];
      this.personalData = JSON.stringify(this.items);
      if(this.items.image != '' && this.items.image != null )
      {
        this.img1 = this.serverURL+"/images/"+this.items.image;
      }
      this.form.patchValue(this.items);
      console.log("test "+this.personalData );
      this.loader.hideLoader();
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

  submitUserDetails() {
    const uploadData = new FormData();
    console.log("subrde"+JSON.stringify(this.selectedFile));
    if(this.selectedFile){
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
    }
    

    this.http.put(SERVER_URL +'/api/updateuser/' + this.userid, this.form.value)
    .subscribe((responseCreate: any) => {
      if(this.selectedFile){
          this.responseCreateId = responseCreate._id;
          this.http.put(SERVER_URL + '/api/UserImage/' + this.responseCreateId, uploadData)
          .subscribe((responseUpdate: any) => {
                  console.log('Updated with image! '+this.responseCreateId);
            });
      }
      this.presentToast ('Data Updated Successfully!');
      console.log('Updated! '+this.responseCreateId);
    });
 }




}
