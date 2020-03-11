import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent implements OnInit {
  @Output() accountDetail = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService, private accountService: AccountService) { }

  ngOnInit(): void {
  }
  /*
  onCreateAccount(accountN: string, stat: string) {
    this.accountDetail.emit({
      name: accountN,
      status: stat
    });
    // console.log('A server status changed, new status: ' + stat);
    this.loggingService.logStatusChange(stat);
  }
  */
  onCreateAccount(accountN: string, stat: string) {
    this.accountService.addAccount(accountN, stat);
    this.loggingService.logStatusChange(stat);
  }
}
