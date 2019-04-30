import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import {AuthGuard} from "./auth.guard";
import {VenderService} from "../services/vender.services";


//import {MyDatePickerModule} from 'mydatepicker';


//import {ModalVender} from "./vendor/components/modalvendor/modal.component.";
//import { DatepickerComponent } from './promo/datepicker/datepicker.component';


@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages
  ],
  entryComponents: [
  ],
  providers: [AuthGuard, VenderService]
})
export class PagesModule {
}
