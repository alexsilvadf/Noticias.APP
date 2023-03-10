import { SafeResourceUrl } from "@angular/platform-browser";

export interface Noticia{
    id?: number;
    titulo: string;
    descricao: string;
    imagem: string;
    dataCriacao?: string;
    data_Atualizacao?: string;
    noticias?: [ { texto: string, usuario: string}];   
    comentarios?: [ { text: string; username: string}];
    imageUrl?: SafeResourceUrl;
}