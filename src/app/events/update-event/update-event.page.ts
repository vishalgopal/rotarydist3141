import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {
  public form: FormGroup;
  img1: any;
  selectedFile: File;
  public clubid:any;
  public eventid:any;
  public eventdetails:any;
  public userid :any;
  serverURL = SERVER_URL;
  
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'my-auth-token'
     })
  }
  eventType: any;
 constructor( public navCtrl: NavController,
              private _FB: FormBuilder,
              private http: HttpClient,
              private storage: Storage,
              private toastController :ToastController,
              private router :Router,
              private route : ActivatedRoute )
      {
        this.storage.get('userid').then((usrid) => {
          this.userid = usrid;
          console.log(this.userid);
        });

        this.eventid = this.route.snapshot.paramMap.get('id');
      
        this.http.get(SERVER_URL + '/api/event/' + this.eventid + "?userid=" + this.userid).subscribe((response: any) => {
          this.eventdetails = response[0];
          
          this.form.patchValue(response[0]);
          // this.loader.hideLoader();
          });

     this.storage.get('eventType').then((eventtype) => {
        this.eventType = eventtype;
     });
     this.storage.get('clubid').then((clbid) => {
        this.clubid = clbid;
      });
     this.form = this._FB.group({
     title: ['', Validators.required],
     description: ['', Validators.required],
     club: [this.clubid],
     district:['3141'],
     owner: ['', Validators.required],
     eventDate: ['', Validators.required],
     location: ['', Validators.required],
     costPerPerson: [''],
     eventType: [this.eventType],
     costPerCouple: [''],
     onlineBookingLink: [''],
     offlineBeneficiaryName: [''],
     offlineAccountNumber: [''],
     offlineAccountType: [''],
     offlineIFSCCode: [''],
     ticketLink: [''],
     scope: [''],
     image: [null, Validators.required],
     address: this._FB.group({ // make a nested group
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        pincode: [''],
      }),
     contact: this._FB.array([
        this.initContactFields()
     ])
  });
  }
  initContactFields(): FormGroup {
     return this._FB.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required]
     });
  }

  addNewInputField(): void {
     const control = this.form.controls.contact as FormArray;
     control.push(this.initContactFields());
  }

  removeInputField(i: number): void {
     const control = this.form.controls.contact as FormArray;
     control.removeAt(i);
  }

  manage(val: any): void {
     console.dir(val);
  }

  get contact(){
     return  this.form = this._FB.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        owner: ['', Validators.required],
        eventDate: ['', Validators.required],
        location: ['', Validators.required],
        costPerPerson: [''],
        eventType: ['', Validators.required],
        costPerCouple: [''],
        club:[this.clubid],
        district:['3141'],
        onlineBookingLink: [''],
        offlineBeneficiaryName: [''],
        offlineAccountNumber: [''],
        offlineAccountType: [''],
        offlineIFSCCode: [''],
        ticketLink: [''],
        scope: [''],
        image: [null],
        address: this._FB.group({ // make a nested group
           addressLine1: [''],
           addressLine2: [''],
           city: [''],
           state: [''],
           pincode: [''],
         }),
        contact: this._FB.array([
           this.initContactFields()
        ])
     });
  }

  onFileChange(event, field) {
     // this.selectedFile = event.target.files[0];
     if (event.target.files && event.target.files.length) {
       const [file] = event.target.files;
       this.selectedFile = event.target.files[0];
       // just checking if it is an image, ignore if you want
       const reader = new FileReader();
       reader.onload = (event: any) => {
           this.img1 = event.target.result;
        };
       reader.readAsDataURL(event.target.files[0]);
     }
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

  submitEvent() {
     const uploadData = new FormData();
     if(this.selectedFile){
         uploadData.append('image', this.selectedFile, this.selectedFile.name);
     }
     uploadData.append('title', 'sample');
     uploadData.append('owner', 'sampleclub');
     uploadData.append('eventType', this.eventType);
     this.http.put(SERVER_URL + '/api/event/'+this.eventid, this.form.value)
     .subscribe((responseCreate: any) => {
      if(this.selectedFile){
            this.http.put(SERVER_URL + '/api/eventImage/'+this.eventid, uploadData)
            .subscribe((responseUpdate: any) => {
            console.log('Updated!');
         });
         }
         if(this.eventType == "event")
         {
            this.presentToast("Event updated successfully.");
            const navigationExtras: NavigationExtras = {
               state: {
               eventType: this.eventType,
               }
            };
            this.router.navigate(['/events/my-club-events'], navigationExtras);
         }
         
         else if(this.eventType == "project"){
         this.presentToast("Project updated successfully.");
         const navigationExtras: NavigationExtras = {
            state: {
               eventType: this.eventType,
            }
         };
         this.router.navigate(['/events/my-club-events'], navigationExtras);
      }
      else if(this.eventType == "meeting"){
         this.presentToast("Meeting updated successfully.");
         const navigationExtras: NavigationExtras = {
            state: {
               eventType: this.eventType,
            }
         };
         this.router.navigate(['/events/my-club-events'], navigationExtras);
      }
      else{
         this.presentToast("Fund raiser updated successfully.");
         const navigationExtras: NavigationExtras = {
            state: {
               eventType: this.eventType,
            }
         };
         this.router.navigate(['/events/my-club-events'], navigationExtras);
      }
      
  });
  }
}