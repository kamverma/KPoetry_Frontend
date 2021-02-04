import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as momemt from 'moment/moment';

@Component({
  selector: 'app-workitem',
  templateUrl: './workitem.component.html',
  styleUrls: ['./workitem.component.css']
})
export class WorkitemComponent implements OnInit {
  @Input() workitem;
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();
  isUpdate: boolean;

  getPostedOnDate(date): string {
    let dateString = "";
    dateString = momemt(date).format("ddd DD MMM YYYY");
    return dateString;
  }

  emitOnDelete(event) {
    this.onDelete.emit(event);
  }

  emitOnUpdate() {
    this.isUpdate = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
