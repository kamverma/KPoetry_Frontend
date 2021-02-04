import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../../../services/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  closeResult: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  @ViewChild(TemplateRef) content: TemplateRef<any>;


  constructor(
    private modalService: NgbModal, 
    private registerService: RegisterService, 
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.openSignupModal();
  }

  openSignupModal() {
    this.modalService.open(this.content, { windowClass: 'dark-modal', centered: true });
  }

  closeSignupModal() {
    this.router.navigate(['../']);
  }

  onRegisterSubmit() {
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password
    }

    // Validate user
    if(!this.registerService.validateRegister(user)) {
      // console.log("Please fill all the mandatory details.");
      this.flashMessagesService.show("Please fill all the mandatory details.", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } 

    // Validate Email
    // if(this.registerService.validateEmail) {
    //   // console.log('Please enter a correct email.');
    //   this.flashMessagesService.show("Please enter a correct email.", {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show("Registered Successfully. You can login now.", {cssClass: 'alert-success', timeout: 3000});
        setTimeout(() => {
          this.modalService.dismissAll();
          this.router.navigate(['../user/login']);
        }, 3000);
      } else {
        this.flashMessagesService.show("Something went wrong!", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/user/register']);
      }
    })
  }

}
