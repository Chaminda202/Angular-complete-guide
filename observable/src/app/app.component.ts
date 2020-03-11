import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isActive = false;
  subjectSubcription: Subscription;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    /*
    this.userService.activatedEmitter
        .subscribe(
          (data: boolean) => {
            this.isActive = data;
          }
        );
    */
    this.subjectSubcription = this.userService.activatedSubject
        .subscribe(data => {
          this.isActive = data;
        });
  }

  ngOnDestroy(): void {
    this.subjectSubcription.unsubscribe();
  }
}
