import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  validateRegister(user) {
    if(!user.first_name || !user.last_name || !user.email || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    // Regular expression for email
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }
}
