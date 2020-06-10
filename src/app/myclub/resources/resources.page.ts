import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  private fileTransfer: FileTransferObject;
  constructor(private transfer: FileTransfer, private file: File) { }

  ngOnInit() {
  }

  public download(fileName, filePath) {
    let url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();
  
    this.fileTransfer.download(url, this.file.dataDirectory + fileName, true).then((entry) => {
      //here logging our success downloaded file path in mobile. 
      console.log('download completed: ' + entry.toURL());
      
    }).catch((error) => {
      //here logging an error. 
      console.log('download failed: ' + JSON.stringify(error));
    });
  }
}
