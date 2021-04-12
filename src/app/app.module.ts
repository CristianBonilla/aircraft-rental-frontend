import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CoreModule } from '@core/core.module';

import { INTERCEPTOR_PROVIDERS } from '@interceptors/.';

import { AppComponent } from 'src/app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
