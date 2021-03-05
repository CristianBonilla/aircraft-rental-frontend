import { NgModule } from '@angular/core';

import { WINDOW_PROVIDERS } from '@core/providers/window.provider';
import { localeIDProvider } from '@core/providers/locale.provider';

@NgModule({
  declarations: [],
  imports: [],
  providers: [ WINDOW_PROVIDERS, localeIDProvider ]
})
export class CoreModule { }
