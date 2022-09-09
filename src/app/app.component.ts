import { Component, HostBinding } from '@angular/core';
import { loadMessages } from 'devextreme/localization';
import { ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private screen: ScreenService, public appInfo: AppInfoService) {
    loadMessages({
      "en": {
        "Yes": "Si",
        "dxDataGrid-editingConfirmDeleteMessage": "¿Esta seguro de borrar este registro?",
        "dxDataGrid-editingSaveRowChanges": "Guardar",
        "dxDataGrid-editingCancelRowChanges": "Cancelar",
      }
    });
  }

}
