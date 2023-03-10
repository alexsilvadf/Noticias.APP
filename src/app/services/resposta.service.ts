import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  resposta: string = '';
  constructor() { }

  add(mensagem: string){
    this.resposta = mensagem;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.resposta = '';
  }

}
