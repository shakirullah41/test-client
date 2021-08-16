import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyState } from './store/state/company.state';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [AppComponent, CompanyComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([CompanyState]),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
