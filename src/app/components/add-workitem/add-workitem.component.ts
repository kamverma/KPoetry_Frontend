import { Component, OnInit } from '@angular/core';
import { WorkitemsService } from '../../services/workitems.service';

@Component({
  selector: 'app-add-workitem',
  templateUrl: './add-workitem.component.html',
  styleUrls: ['./add-workitem.component.css']
})
export class AddWorkitemComponent implements OnInit {

  title: string;
  body: string;
  updated: boolean;
  // Fetch logged user from local stotage
  user: any = JSON.parse(localStorage.getItem('user'));

  constructor(private workitemsService: WorkitemsService) { }

  ngOnInit(): void {
    this.getDataToUpdateWorkitem();
  }

  addWorkitem(): void {
    const newWorkitem = {
      "user_id": this.user.id,
      "title": this.title,
      "body": this.body,
      "posted_by": "Kamal Verma"
    }
    this.workitemsService.addWorkitem(newWorkitem).subscribe(res => {
      if(res.success) {
        // *To implement flash messages
        alert("Submitted Successfully!");
        this.title = '';
        this.body = '';
      } else {
        // * To implement something went wrong flash message
        alert(res.message);
      }
    });
  }

  updateWorkitem(): void {
    const updatedWorkitem = {
      "title": this.title,
      "body": this.body,
      "posted_by": "Kamal Verm"
    }
    this.workitemsService.updateWorkitem(window.history.state.workitem.id, updatedWorkitem).subscribe( res => {
      if(res.success) {
        // *To implement success flash message
        alert("Workitem updated successfully");
        this.title = '';
        this.body = '';
        this.updated = false;
      } else {
        // * To implement something went wrong flash message
        alert(res.message);
      }
    });
    
  }

  getDataToUpdateWorkitem() {
    if(window.history.state.isUpdate && window.history.state.workitem) {
      this.updated = true;
      this.body = window.history.state.workitem.body;
      this.title = window.history.state.workitem.title;
    }
  }

}
