import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  serverId: number;

  constructor(private serverService: ServerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams['allowEdit']);
    // console.log(this.route.snapshot.fragment);

    this.route.queryParams
          .subscribe(
            (queryParams: Params) => {
              console.log('Before Allowed value ' + queryParams['allowEdit']);
              this.allowEdit = +queryParams['allowEdit'] === 1 ? true : false ;
              console.log('Afer Allowed value ' + this.allowEdit);
            }
          );
    this.serverId = + this.route.snapshot.params['id'];
    this.server = this.serverService.getServer(this.serverId);
    this.route.params.subscribe(
      (params: Params) => {
        this.serverId = +params['id'];
      }
    );
    this.server = this.serverService.getServer(this.serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serverService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
        !this.changesSaved) {
          return confirm('Do you want to discard changes?');
    } else {
      return true;
    }
  }
}
