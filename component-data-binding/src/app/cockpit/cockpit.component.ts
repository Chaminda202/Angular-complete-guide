import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() onServerAdded = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() onBlueprintAdded = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() addedEnteredDetails = new EventEmitter<{serverName: string, type: string, serverContent: string}>();
  //newServerName = '';
  //newServerContent = '';

  @ViewChild('serverNameInput') serverNameInput: ElementRef;
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // onAddServer() {
  //   this.onServerAdded.emit({
  //     serverName: this.newServerName,
  //      serverContent: this.newServerContent
  //     });
  // }

  // onAddBluePrint() {
  //   this.onBlueprintAdded.emit({
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent
  //   });
  // }

  /*
  onAddServer() {
    this.addedEnteredDetails.emit({
      serverName: this.newServerName,
      type: 'server',
      serverContent: this.newServerContent
    });
  }

  onAddBluePrint() {
    this.addedEnteredDetails.emit({
      serverName: this.newServerName,
      type: 'blueprint',
      serverContent: this.newServerContent
    });
  }

  onAddServer(serverName: HTMLInputElement) {
    this.addedEnteredDetails.emit({
      serverName: serverName.value,
      type: 'server',
      serverContent: this.newServerContent
    });
  }

  onAddBluePrint(serverName: HTMLInputElement) {
    this.addedEnteredDetails.emit({
      serverName: serverName.value,
      type: 'blueprint',
      serverContent: this.newServerContent
    });
  }
  */

 onAddServer() {
  this.addedEnteredDetails.emit({
    serverName: this.serverNameInput.nativeElement.value,
    type: 'server',
    serverContent: this.serverContentInput.nativeElement.value
  });
}

onAddBluePrint() {
  this.addedEnteredDetails.emit({
    serverName: this.serverNameInput.nativeElement.value,
    type: 'blueprint',
    serverContent: this.serverContentInput.nativeElement.value
  });
}
}
