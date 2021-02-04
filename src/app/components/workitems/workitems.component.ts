import { Component, OnInit } from '@angular/core';
import { WorkItem } from '../../model/workitem';
import { WorkitemsService } from '../../services/workitems.service';

@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrls: ['./workitems.component.css']
})
export class WorkitemsComponent implements OnInit {

  workitems: WorkItem[];

  constructor(private workitemService: WorkitemsService) { }

  ngOnInit(): void {
    this.workitemService.getWorkitems().subscribe(workitems => {
      this.workitems = workitems;
    });
  }

  deleteWorkitem(id: number) {
    // Delete from the UI
    this.workitems = this.workitems.filter(workitem => workitem.id != id);

    // Delete from the Backend
    this.workitemService.deleteWorkitem(id).subscribe(res => {
      if(res.success) {
        // *To implement success flash message 
        alert("Workitem Deleted");
      } else {
        // *To implement something went wrong flash message 
        alert(res.message);
      }
    });
  }

}
