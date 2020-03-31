import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title ='RentAppFrontEnd'
  images = [];
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required])
 });
  
 constructor(private http: HttpClient) { }
  
  
 onFileChange(event) {
   if (event.target.files && event.target.files[0]) {
       var filesAmount = event.target.files.length;
       for (let i = 0; i < filesAmount; i++) {
               var reader = new FileReader();
  
               reader.onload = (event:any) => {
                 console.log(event.target);
                  this.images.push(event.target.result); 
  
                  // this.myForm.patchValue({
                  //    fileSource: this.images
                  // });
               }
 
               reader.readAsDataURL(event.target.files[i]);
       }
   }
 }
 removeAllImage(){
   this.images.splice(0,this.images.length);
 }

 onClose(index)
 {
  this.images.splice(index,1);

 }
   
 submit(){
   console.log(this.myForm.value);
  //  this.http.post('http://localhost:8001/upload.php', this.myForm.value)
  //    .subscribe(res => {
  //      console.log(res);
  //      alert('Uploaded Successfully.');
  //    })
 }
}