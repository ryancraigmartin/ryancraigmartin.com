import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { LinksComponent } from './links/links.component'

const routes: Routes = [
  {
    path: '',
    component: LinksComponent,
    data: {
      title: 'Ryan Craig Martin | Full Stack Software Developer | Miami, FL',
      description:
        'I am Ryan Craig Martin, a software developer based in Miami, Florida, Currently building Sommsation, a wine experience technology platform designed to revolutionize the way people share experiences over wine. I am also a self-taught musician, sound designer, audio engineer, disk jockey, and record collector with a deep interest in podcasts as a creative digital medium. I look forward to connecting with you!',
    },
  },
  {
    path: 'links',
    component: LinksComponent,
    data: {
      title: 'Links | Ryan Craig Martin',
      description:
        'Links to get in touch with me via email or on my social media profiles as well as current projects and other relevant resources.',
    },
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./links/links.module').then(m => m.LinksModule),
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'links',
  //   loadChildren: () => import('./links/links.module').then(m => m.LinksModule),
  //   pathMatch: 'full',
  // },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
