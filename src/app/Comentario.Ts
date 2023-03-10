export interface Comentario{
    id?: number;
    texto: string;
    usuario: string;
    noticiaId: number;
    data_Criacao?: string;
    data_Atualizacao?: string;
}