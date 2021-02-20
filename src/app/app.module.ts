import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@core/core.module';
import { INTERCEPTOR_PROVIDERS } from '@interceptors/.';

import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    NgbModule,
    CoreModule,
  ],
  providers: [
    INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
