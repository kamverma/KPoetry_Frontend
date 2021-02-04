import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeResult: string;
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  email: string;
  password: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  // Angular Life cycle hook
  // Will respond after angular initialises component's view and child views
  ngAfterViewInit() {
    this.openLoginModal();
  }

  openLoginModal() {
    this.modalService.open(this.content, { windowClass: 'dark-modal', centered: true });
  }

  closeLoginModal() {
    this.router.navigate(['../']);
  }

  // Login User
  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      // Subscribe call takes 3 optinal arguments:
      // 1 - Sucess handler function
      // 2 - Error handler function
      // 3 - Complete handler function

      // 1 - Success handler callback
      data => {
      if(data.success) {
        // Store User information
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You're logged in now.", {cssClass: "alert-success", timeout: 3000});
        setTimeout(() => {
          // Navigate to the desired page
          this.router.navigate(["../"]);
          // Close login modal
          this.modalService.dismissAll();
        }, 3000);
      } else {
        this.flashMessage.show(data.message, {cssClass: "alert-danger", timeout: 3000});
        setTimeout(() => {
          this.email = "";
          this.password = "";
        }, 3000);
        // Navigate to the same page
        this.router.navigate(['/user/login']);
      }
    },

    // 2 - Error handler callback
    res => {
      if(res.status === "404" || !res.error.success) {
        this.flashMessage.show(res.error.message, {cssClass: "alert-danger", timeout: 3000});
        setTimeout(() => {
          this.modalService.dismissAll();
          this.router.navigate(['/user/register']);
        }, 3000);
      }
    },

    // 3 - Request complete callback
    // () => {
    //   // Write your logic here
    //   console.log("Request Completed");
    // }
    )
  }
}
