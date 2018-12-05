import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gaap-editor';

  constructor(
    private _electronService: ElectronService
  ) {}

  startGithub() {
    this._electronService.shell.openExternal('https://github.com/adrianowead');
  }
}
