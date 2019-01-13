import { TimelineModule } from './timeline/timeline.module';
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
import { TimelineComponent } from './timeline/timeline.component';
import { TextFragmentComponent } from './text-fragment/text-fragment.component';

const appRoutes = [
  { path: 'splash', component: SplashScreenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'text-editor', component: TextEditorComponent },
  { path: 'timeline', component: TimelineComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashScreenComponent,
    TextEditorComponent,
    TimelineComponent,
    TextFragmentComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // for debug only
    ),
    BrowserModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    TextEditorModule,
    TimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
