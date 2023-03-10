import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { convertToParamMap } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Noticia } from 'src/app/Noticias';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css'],
})
export class NoticeFormComponent implements OnInit {
  @Input() btnText!: string;
  @Output() onSubmit = new EventEmitter<Noticia>();
  @Input()  noticia: Noticia[] | null = null;

  fileImage!: string;

  arquivo!: File;

  noticiaForm!: FormGroup;
 

  myimage!: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    this.noticiaForm = new FormGroup({
      id: new FormControl(''),   
      titulo: new FormControl(this.noticia ? this.noticia[0].titulo: '', Validators.required),
      descricao: new FormControl(this.noticia ? this.noticia[0].descricao: '', Validators.required),
      imagem: new FormControl(''),
    });
  }

  get titulo() {
    return this.noticiaForm.get('titulo')!;
  }

  get descricao() {
    return this.noticiaForm.get('descricao')!;
  }

  onFileSelected(event: any) {

    if(event.target.files && event.target.files.length > 0){
     
      // this.fileImage = event.target.files[0];

      this.arquivo = event.target.files[0];     
     
    }
    // const file: File = event.target.files[0]; 

    this.noticiaForm.patchValue({ imagem: this.arquivo });
   
  }

  submit() {
    console.log('Enviando para o formulario pai');
    if (this.noticiaForm.invalid) {
      return;
    }   
    this.onSubmit.emit(this.noticiaForm.value);
  }





}
