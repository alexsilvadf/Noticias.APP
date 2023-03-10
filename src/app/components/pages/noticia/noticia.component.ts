import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Noticia } from 'src/app/Noticias';
import { NoticiaService } from 'src/app/services/noticia.service';
import { RespostaService } from 'src/app/services/resposta.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent implements OnInit {
  noticia?: Noticia[];
  imageUrl!: SafeResourceUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private mensagemService: RespostaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // this.noticiaService.getNoticia(id).subscribe((item) => (this.noticia = item));

    this.noticiaService.getNoticia(id).subscribe((item) => {
      const dado = item;

      this.noticia = dado;

      let url = 'data:image/jpg;base64, ' + this.noticia[0].imagem;

      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  async removeHandler(id: number) {
    await this.noticiaService.removeNoticia(id).subscribe();

    this.mensagemService.add('Noticia excluida com sucesso');

    this.router.navigate(['/']);


  }
}
