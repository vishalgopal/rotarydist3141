import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.page.html',
  styleUrls: ['./add-resource.page.scss'],
})
export class AddResourcePage implements OnInit 
{
  public form: FormGroup;  
  public clubid:any;
  selectedFile: File;
  responseCreateId:any;
  img1: any;
  public resourceTypeVal : any;
  public i = 0;
  uploadfilelabel: any;

  
  constructor( public navCtrl: NavController,
    private _FB: FormBuilder,
    private http: HttpClient,
    private storage: Storage,
    private toastController :ToastController,
    private router :Router,
    private route: ActivatedRoute) {
        this.form = this._FB.group({
          name: ['', Validators.required],
          link:[null]
        });

        this.storage.get('clubid').then((clbid) => {
          this.clubid = clbid;
          console.log("club id : "+this.clubid)
        });
     }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      this.resourceTypeVal = params.get('resourcesType');
      console.log(" inside this.resourceType -> "+params.keys+" has : "+params.has('resourcesType')+" "+this.resourceTypeVal);
      // if(this.resourceTypeVal == "gml")
      // {
      //   this.uploadfilelabel = "Upload File";
      // }
      // else{
      //   this.uploadfilelabel = "Upload File";
      // }
    });
    // console.log(" this.resourceType2 -> "+this.resourceType);
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
    
    this.form.value.club = this.clubid;
    this.form.value.resourceType = this.resourceTypeVal;

    const uploadData = new FormData();
    console.log("subrde"+this.form.value.club);
    if(this.selectedFile)
    {
      if(this.resourceTypeVal == "gml")
      {
        if(this.selectedFile.type != "application/pdf")
        {
          console.log(this.selectedFile.type);
          this.presentToast("Upload Pdf file only.");
          this.i++;
        } 
      }

      if(this.i == 0)
      {
        var filetype = this.selectedFile.type;
        var type = filetype.split("/");
        this.form.value.type = type[1];
        uploadData.append('link', this.selectedFile, this.selectedFile.name);
      }
    }

    if(this.i == 0)
    {
      this.http.post(SERVER_URL + '/api/resource',this.form.value)
      .subscribe((responseUpdate: any) => {
        if(this.selectedFile){
          this.responseCreateId = responseUpdate;
          console.log("rhis.responseCreateId "+responseUpdate);
          this.http.put(SERVER_URL + '/api/resourcesFile/' + this.responseCreateId, uploadData)
          .subscribe((responseUpdate: any) => {
                  console.log('Updated with file! '+this.responseCreateId);
            });
         }
  
        console.log(responseUpdate);
        this.presentToast("Resource created Successfully.");
        if(this.resourceTypeVal == "gml")
        {
          this.router.navigate(["/gml"]);
        }
        else if(this.resourceTypeVal == "club")
        {
          this.router.navigate(["/club-resource"]);
        }
        else if(this.resourceTypeVal == "resource")
        {
          this.router.navigate(["/resources"]);
        }
      });
    }
    
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
