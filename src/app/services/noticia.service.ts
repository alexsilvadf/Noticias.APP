import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia } from '../Noticias';
import { Resposta } from '../Resposta';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  private baseApiUrl = environment.baseApiUrl;
  // private apiUrl = `${this.baseApiUrl}api/noticias`;
  private apiUrl = `${this.baseApiUrl}api/noticia`;

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/Buscar`);
  }

  getNoticia(id: number): Observable<Noticia[]> {
    const url = `${this.apiUrl}/Buscar/${id}`;
    return this.http.get<Noticia[]>(url);
  }

  createNoticia(formdata: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/Incluir`, formdata);
  }

  list() {
    return this.http.get(`${this.apiUrl}/Buscar`).pipe(tap(console.log));
  }

  removeNoticia(id: number){
    const url = `${this.apiUrl}/Remover/${id}`;
    return this.http.delete(url);
  }

updateNoticia(id: number, formData: FormData): Observable<FormData>{
  const url = `${this.apiUrl}/Update/${id}`;
  return this.http.put<FormData>(url, formData);
}

}
