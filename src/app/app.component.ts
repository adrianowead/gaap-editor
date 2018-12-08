import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _ngZone: NgZone,
    private _router: Router
  ) {
    this._router.navigateByUrl('/splash');

    // timeout temporário
    // @TODO: Futuramente trocar para um processo de checagem de ambiente, arquivos recentes e dependências
    // para depois direcionar o usuário
    setTimeout(() => {
      this._ngZone.run(() => {
        this._router.navigateByUrl('/home');
      });
    }, 3000);
  }
}
