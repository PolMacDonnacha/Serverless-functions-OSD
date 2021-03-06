import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myBooks:any = [];
  titleValue = '';
  authorValue = '';

  constructor(public firebaseApiService:FirebaseApiService)
  {

  }
  ngOnInit()
  {
    this.loadBooks();
  }
  loadBooks()
  {
    return this.firebaseApiService.getBooks().subscribe((data : {}) =>
    {
      this.myBooks = data;
    });
  }


  addBook()
  {
    console.log('form Submitted');
    return this.firebaseApiService
    .addBook(this.titleValue,this.authorValue).subscribe((data: {}) =>
    {
    this.myBooks = data;
    this.titleValue='';
    this.authorValue='';
  })
  }

  deleteBook(id:string)
  {
    return this.firebaseApiService.delBook(id).subscribe((data: {}) =>
    {
      this.myBooks = data;
    })
  }
}
