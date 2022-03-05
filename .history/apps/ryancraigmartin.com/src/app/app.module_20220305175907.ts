import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { LinksModule } from './links/links.module'
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app.routing.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, LinksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
