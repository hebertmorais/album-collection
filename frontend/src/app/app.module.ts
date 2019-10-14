import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
