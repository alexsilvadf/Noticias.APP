import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Noticia } from 'src/app/Noticias';
import { NoticiaService } from 'src/app/services/noticia.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allNoticias: Noticia[] = [];
  noticias: Noticia[] = [];
  baseApiUrl = environment.baseApiUrl;
  imageUrl!: SafeResourceUrl;
  imagemRender!: string;

  faSearch = faSearch;
  searchTerm: string = '';

  thumbnail: any;
  name = 'Test display image';

  constructor(
    private noticaService: NoticiaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.noticaService.getNoticias().subscribe((items) => {
      const data = items;

      this.allNoticias = data;
      this.noticias = data;

      for (let i = 0; i < data.length; i++) {
        let url = 'data:image/jpg;base64, ' + this.noticias[i].imagem;

        this.noticias[i].imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
             
      }     
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.noticias = this.allNoticias.filter((noticia) => {
      return noticia.titulo.toLocaleLowerCase().includes(value);
    });
  }
}
