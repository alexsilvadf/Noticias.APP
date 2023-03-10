import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { EditNoticiaComponent } from './components/pages/edit-noticia/edit-noticia.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewNoticeComponent } from './components/pages/new-notice/new-notice.component';
import { NoticiaComponent } from './components/pages/noticia/noticia.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'notice/new', component: NewNoticeComponent },
  { path: 'notice/edit/:id', component: EditNoticiaComponent},
  { path: 'notice/:id', component: NoticiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
