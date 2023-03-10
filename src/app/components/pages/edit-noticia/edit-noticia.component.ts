import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from 'src/app/Noticias';
import { NoticiaService } from 'src/app/services/noticia.service';
import { RespostaService } from 'src/app/services/resposta.service';

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css'],
})
export class EditNoticiaComponent implements OnInit {
  noticia!: Noticia[];
  btnText: string = 'Editar';
  imageUrl!: SafeResourceUrl;

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private respostaService: RespostaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.noticiaService.getNoticia(id).subscribe((item) => {
      const dado = item;

      this.noticia = dado;

      let url = 'data:image/jpg;base64, ' + this.noticia[0].imagem;

      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  async editHanlder(noticia: Noticia) {
    const id = this.noticia[0].id;

    const formData = new FormData();

    formData.append('titulo', noticia.titulo);
    formData.append('descricao', noticia.descricao);

    if (noticia.imagem) {
      formData.append('imagem', noticia.imagem);
    }

    await this.noticiaService.updateNoticia(id!, formData).subscribe();

    this.respostaService.add(`A notícia ${id} foi atualizado com sucesso!`);

    this.router.navigate(['/']);
  }
}
