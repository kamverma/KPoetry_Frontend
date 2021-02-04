import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    const url = 'http://localhost:5000/api/users/register';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Send registration request
    return this.http.post<any>(url, user, httpOptions);
  }

  // Login user
  authenticateUser(user) {
    const url = 'http://localhost:5000/api/users/login';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Send login request
    return this.http.post<any>(url, user, httpOptions);
  }

  // Store user information in local storage
  storeUserData(token, user) {
    // Save token into local storage
    localStorage.setItem("id_token", token);
    // Save user
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user
  }

  // Logout User
  logoutUser(): any {
    localStorage.clear();
    this.authToken = "",
    this.user = null;
  }
}
