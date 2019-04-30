import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import {isDefined} from '@ngx-translate/core/src/util';

@Injectable()
export class PackagesServices{

  private baseUrl = '';  // URL to web api

  constructor(
    private http: Http) { }

  /** GET heroes from the server */

  getPackages (): any {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', localStorage.getItem('user_token'));
    return this.http.get(this.baseUrl + 'get', { headers: headers })
      .map(res => res.json());
  }
  add( files:File, data: any) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      if(isDefined(files)) {
        formData.append("uploads", files[0], files[0].name);
      }
      for (const d in data) {
        formData.append(d, data[d]);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open("POST", this.baseUrl+"add", true);
      xhr.setRequestHeader('token', localStorage.getItem('user_token'));
      xhr.send(formData);
    });

  }
  editPackage( files:File, data: any) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      if(isDefined(files)) {
        formData.append("uploads", files[0], files[0].name);
      }
      for (const d in data) {
        formData.append(d, data[d]);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open("PUT", this.baseUrl+"edit", true);
      xhr.setRequestHeader('token', localStorage.getItem('user_token'));
      xhr.send(formData);
    });

  }
  deletePackage(id: string): any {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', localStorage.getItem('user_token'));
    let data = { sid : id};
    return this.http.delete(this.baseUrl + 'delete/', { headers: headers, body: data })
      .map(res => res.json());
  }
}
