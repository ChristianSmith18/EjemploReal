import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { PanelComponent } from '../../components/data/panel/panel.component';
import { FormatoSexoPipe } from '../../pipes/formato-sexo.pipe';

// MD
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DataComponent, PanelComponent, FormatoSexoPipe],
  imports: [
    CommonModule,
    DataRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DataModule {}
