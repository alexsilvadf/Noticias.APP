import { ASTWithName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from 'src/app/Noticias';
import { NoticiaService } from 'src/app/services/noticia.service';
import { RespostaService } from 'src/app/services/resposta.service';

@Component({
  selector: 'app-new-notice',
  templateUrl: './new-notice.component.html',
  styleUrls: ['./new-notice.component.css']
})
export class NewNoticeComponent implements OnInit {
btnText = 'Publicar';

  constructor(private noticiaService: NoticiaService,
              private respostaService: RespostaService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async createHandler(noticia: Noticia){
    const formData = new FormData();

    formData.append('titulo', noticia.titulo)
    formData.append('descricao', noticia.descricao)

    if(noticia.imagem){
      formData.append('imagem', noticia.imagem);
    }

    await this.noticiaService.createNoticia(formData).subscribe();

this.respostaService.add('Noticia Incluida com Sucesso');

this.router.navigate(['/']);

  }

}
