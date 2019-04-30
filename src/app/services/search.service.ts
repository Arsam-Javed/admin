import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
@Injectable()
export class SearchService{
  search$: Observable<any>;
  private mySearch = new Subject();

  constructor() {
    this.search$ = this.mySearch.asObservable();
  }

  Search(data) {
    this.mySearch.next(data);
  }
}
