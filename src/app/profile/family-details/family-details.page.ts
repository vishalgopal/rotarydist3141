import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
// Rest API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../../environments/environment';
import { LoaderService } from './../../service/loader.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.page.html',
  styleUrls: ['./family-details.page.scss'],
})
export class FamilyDetailsPage implements OnInit{

  public familyForm: FormGroup;
  itemRows: FormGroup;
  items: any;
  userid: any;
  serverURL = SERVER_URL;
  username: any;
  // public form: FormGroup;
  img1: any;
  selectedFile: File;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  constructor(private _fb: FormBuilder,private loader: LoaderService, private router: Router, private http: HttpClient, private storage: Storage,
    public toastController: ToastController) {

      this.familyForm = this._fb.group({
        itemRows: this._fb.array([this.initItemRows()])
      });

  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() 
  {
      this.storage.get('userid').then((usrid) => {
        this.userid = usrid;
        this.userGet();
        // if(this.items)
        // {
        //   for (let item=0; item < this.items.familyDetails.length; item++){
        //   this.addNewRow();
        //   }
        // }
        // var data = JSON.stringify(this.items);
        // this.items = JSON.parse(this.items);
        // for(var i = 0; i<this.items.familyDetails; i++)
        // {
        //   // (<FormGroup>this.itemRows.controls['name']).patchValue(this.items.familyDetails.name[i]);

        //   this.familyForm.controls['itemRows'].patchValue({
        //     name:  this.items.familyDetails.name[i],
        //     relation: this.items.familyDetails.relation[i],
        //     mobile: this.items.familyDetails.mobile[i],
        //     emailId: this.items.familyDetails.emailId[i],
        //     birthday: this.items.familyDetails.birthday[i],
        //     anniversary: this.items.familyDetails.anniversary[i],
        //     bloodGroup: this.items.familyDetails.bloodGroup[i],
        //     about: this.items.familyDetails.about[i],         
        //     addressLine1: this.items.familyDetails.addressLine1[i],
        //     addressLine2: this.items.familyDetails.addressLine2[i],
        //     city: this.items.familyDetails.city[i],
        //     state: this.items.familyDetails.state[i],
        //     pincode: this.items.familyDetails.pincode[i], 
        //   }); 
        // }
      });
  }
  
  get formArr() {
    return this.familyForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this.itemRows =this._fb.group({
            name: ['',Validators.required],
            relation: ['', Validators.required],
            mobile: [''],
            emailId: [''],
            birthday: [''],
            anniversary: [''],
            bloodGroup: [''],
            about: [''],         
            addressLine1: [''],
            addressLine2: [''],
            city: [''],
            state: [''],
            pincode: [''], 
    });
  }

  get itemRow() {
    return this.itemRows =this._fb.group({
            name: ['',Validators.required],
            relation: ['', Validators.required],
            mobile: ['', Validators.required],
            emailId: ['', Validators.required],
            birthday: [''],
            anniversary: [''],
            bloodGroup: [''],
            about: [''],         
            addressLine1: [''],
            addressLine2: [''],
            city: [''],
            state: [''],
            pincode: [''], 
    });
  }


  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }




  userGet() {
    console.log('userid get ! '+this.userid);  
    this.http.get(SERVER_URL + '/api/getuser/' + this.userid)
    .subscribe((response: any) => {
      this.items = response[0]; 
      // this.familyForm.controls.itemRows.patchValue(this.items.familyDetails);
      for (let item=1; item < this.items.familyDetails.length; item++){
      //   console.log('Items get ! '+JSON.stringify(this.items.familyDetails[item]));
      //   const playersFormsArray = this.familyForm.get("itemsRows") as FormArray;
      //   playersFormsArray.push(this.itemRows);
      this.addNewRow();
        this.familyForm.controls.itemRows.patchValue(this.items.familyDetails);

      }
      console.log('Items get ! '+JSON.stringify(this.items.familyDetails)+"voo"+this.items.familyDetails.length);
      this.loader.hideLoader();
    });
   
  } 

  submitUserDetails() {
       this.http.put(SERVER_URL + '/api/updateUserFamilyInfo/' + this.userid, this.familyForm.value)
      .subscribe((responseCreate: any) => {
        this.presentToast ('Data Updated Successfully!');
                console.log('Updated! '+this.userid);
      });
  }

}
