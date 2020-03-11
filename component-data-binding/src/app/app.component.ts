import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onServerAdd(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      name: serverData.serverName,
      type: 'server',
      content: serverData.serverContent
    });
  }

  onBlueprintAdd(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      name: blueprintData.serverName,
      type: 'blueprint',
      content: blueprintData.serverContent
    });
  }

  onAddList(addedData: {serverName: string, type: string, serverContent: string}) {
    this.serverElements.push({
      name: addedData.serverName,
      type: addedData.type,
      content: addedData.serverContent
    });
  }

  onIntervalFired(value: number) {
    if (value % 2 === 0) {
      this.evenNumbers.push(value);
    } else {
      this.oddNumbers.push(value);
    }
  }
}

