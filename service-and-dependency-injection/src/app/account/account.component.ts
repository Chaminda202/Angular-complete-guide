import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();
  constructor(private accountService: AccountService, private loggingService: LoggingService) { }

  ngOnInit(): void {
  }
  /*
  onSetTo(status: string) {
    console.log('Click button value ' + status);
    this.statusChanged.emit({
      id: this.id,
      newStatus: status
    });
  }
  */
  onSetTo(status: string) {
    this.accountService.updateAccountStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
