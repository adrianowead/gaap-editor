import { TextEditorModule } from './text-editor/text-editor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

const appRoutes = [
  { path: 'splash', component: SplashScreenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'text-editor', component: TextEditorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashScreenComponent,
    TextEditorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // for debug only
    ),
    BrowserModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    TextEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
