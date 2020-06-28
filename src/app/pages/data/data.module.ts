import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { PanelComponent } from '../../components/data/panel/panel.component';

// MD
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DataComponent, PanelComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DataModule {}
