import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public form: FormGroup;
   img1: any;
   selectedFile: File;
   public clubid:any;
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
               private router :Router ) {
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
      owner: ['', Validators.required],
      eventDate: ['', Validators.required],
      googlemap: ['', Validators.required],
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
         addressLine1: ['', [Validators.required]],
         addressLine2: ['', [Validators.required]],
         city: ['', [Validators.required]],
         state: ['', [Validators.required]],
         pincode: ['', [Validators.required]],
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
         googlemap: ['', Validators.required],
         costPerPerson: [''],
         eventType: ['', Validators.required],
         costPerCouple: [''],
         club:[this.clubid],
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
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
      uploadData.append('title', 'sample');
      uploadData.append('owner', 'sampleclub');
      uploadData.append('eventType', this.eventType);
      this.http.post(SERVER_URL + '/api/event/', this.form.value)
      .subscribe((responseCreate: any) => {
         this.http.put(SERVER_URL + '/api/eventImage/' + responseCreate, uploadData)
         .subscribe((responseUpdate: any) => {
         console.log('Updated!');
         if(this.eventType == "event")
         {
            this.presentToast("Event created successfully.");
            const navigationExtras: NavigationExtras = {
               state: {
                 eventType: this.eventType,
               }
             };
             this.router.navigate(['/events/my-club-events'], navigationExtras);
         }
         else{
            this.presentToast("Project created successfully.");
            const navigationExtras: NavigationExtras = {
               state: {
                 eventType: this.eventType,
               }
             };
             this.router.navigate(['/events/my-club-events'], navigationExtras);
         }
         
      });
   });
   }
}
