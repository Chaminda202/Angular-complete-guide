import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent implements OnInit{
  accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }

/*
 accounts = [
  {
    name: 'Master Account',
    status: 'active'
  },
  {
    name: 'Test Account',
    status: 'inactive'
  },
  {
    name: 'Hidden Account',
    status: 'unknown'
  }];

  onAccountAdded(newAccount: {name: string, status: string}) {
    console.log('Added account' + JSON.stringify(newAccount));
    this.accounts.push(newAccount);
    console.log('Print accounts list ' + JSON.stringify(this.accounts));
  }

  onStatusChanged(changeItem: {id: number, newStatus: string}) {
    console.log('Click the button ' + JSON.stringify(changeItem));
    this.accounts[changeItem.id].status = changeItem.newStatus;
  }
  */
}
