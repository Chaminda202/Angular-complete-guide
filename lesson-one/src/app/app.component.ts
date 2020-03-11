import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  isDisabled = true;
  showContent = false;
  log = [];

  insertUserName(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
    this.isDisabled = true;
    if (this.username.length > 0) {
      this.isDisabled = false;
    }
  }

  resetUsername() {
    this.username = '';
    this.isDisabled = true;
  }

  onDisplayLog() {
    this.showContent = !this.showContent;
    this.log.push(this.log.length + 1);
  }

  onDisplayLogTimeStamp() {
    this.showContent = !this.showContent;
    this.log.push(new Date());
  }
}
