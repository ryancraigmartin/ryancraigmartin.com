import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { LinksComponent } from './links/links.component'

const routes: Routes = [
  { path: '', component: LinksComponent },
  { path: 'links', component: LinksComponent },
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
