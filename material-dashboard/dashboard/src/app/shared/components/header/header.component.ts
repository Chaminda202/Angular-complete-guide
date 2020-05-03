import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toogleSideBarEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  toogleSideBar() {
    this.toogleSideBarEmitter.emit();
  }
}
