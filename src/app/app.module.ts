import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {LoginService} from './login.service';
import {AppService} from './app.service';
import {AuthorizeInterceptor} from './authorize.interceptor';
import {CurrentUser} from './current-user';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent, HomeDialogComponent} from './home/home.component';
import {LoginGuard} from './login.guard';
import {HomeGuard} from './home.guard';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {HomeService} from './home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeDialogComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [LoginService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true
    },
    HomeService,
    LoginGuard,
    HomeGuard,
    CurrentUser
  ],
  entryComponents: [ HomeDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
