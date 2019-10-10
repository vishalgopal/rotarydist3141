import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../service/loader.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  userData;
  jsonData;
  searchTerm: any = '';
  constructor(private storage: Storage, public navCtrl: NavController, private loader: LoaderService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.userGet();
  }
  userGet() {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/allusers').subscribe((response: any) => {
    this.userData = response;
    this.jsonData = response;
    // this.loader.hideLoader();
    });
  }
  setFilteredItems() {
    this.userData = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.jsonData.filter((item) => {
      return item.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rotaryDetails.clubDesignation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rotaryDetails.districtDesignation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rotaryDetails.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rotaryDetails.rotaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessDetails.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessDetails.classificationProfession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessDetails.keywords.toLowerCase().includes(searchTerm.toLowerCase())
      ;
  });
 }
 edit(item)
 {

 }
 delete(item){

 }
}
