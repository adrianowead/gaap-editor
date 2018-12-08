import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // timeout temporário
    // @TODO: Futuramente trocar para um processo de checagem de ambiente, arquivos recentes e dependências
    // para depois direcionar o usuário
    setTimeout(() => {
      //
    }, 3000);
  }
}
