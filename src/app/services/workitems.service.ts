import { Injectable } from '@angular/core';
import { WorkItem } from '../model/workitem';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkitemsService {

  // Url
  url: string = "http://localhost:5000/api/workitems";

  // Fetch the token from localstorage
  auth_token: string = localStorage.getItem('id_token');

  //Set Headers
  httpOptions = {
    headers: new HttpHeaders(
      {
        'content-type': 'application/json', 
        'Authorization': this.auth_token
      })
  }

  constructor(private http: HttpClient) { }

  // Get all the workitems
  getWorkitems(): Observable<WorkItem[]> {
    return this.http.get<WorkItem[]>(this.url, this.httpOptions);
  }

  // Add new workitem
  addWorkitem(workitem): any {
    return this.http.post<any>(this.url, workitem, this.httpOptions);
  } 

  // Upadte Workitem
  updateWorkitem(id: number, workitemBody): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, workitemBody, this.httpOptions);
  }

  // Delete Workitem
  deleteWorkitem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
  }

}
