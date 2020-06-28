import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Persona, RootPersona } from '../../../intefaces/persona.interface';
import { DatabaseService } from '../../../services/database.service';
import { MatTableDataSource } from '@angular/material/table';

// const ELEMENT_DATA: Persona[] = [
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 4, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
//   { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
// ];

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidos',
    'idSexo',
    'edad',
    'buttons',
  ];

  dataSource: Persona[] = [];

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private title: Title,
    private firestore: DatabaseService
  ) {
    this.title.setTitle('Personas');
    this.firestore.obtenerPersonas().subscribe((personas: RootPersona) => {
      this.dataSource = personas.personas;
      console.log(this.dataSource);
    });
  }

  async agregarPersona() {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Persona',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Ingrese el ID.." style="color:#666">
        <input id="swal-input2" class="swal2-input" placeholder="Ingrese el Nombre.." style="color:#666">
        <input id="swal-input3" class="swal2-input" placeholder="Ingrese los Apellidos.." style="color:#666">
        <input id="swal-input4" class="swal2-input" placeholder="Ingrese el idSexo.." style="color:#666">
        <input id="swal-input5" class="swal2-input" placeholder="Ingrese la edad.." style="color:#666">
      `,
      focusConfirm: false,
      confirmButtonText: 'Agregar',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
          (document.getElementById('swal-input4') as HTMLInputElement).value,
          (document.getElementById('swal-input5') as HTMLInputElement).value,
        ];
      },
    });

    if (formValues) {
      this.firestore
        .agregarPersona({
          id: parseInt(formValues[0]),
          nombre: formValues[1],
          apellidos: formValues[2],
          idSexo: parseInt(formValues[3]),
          edad: parseInt(formValues[4]),
        })
        .then(() => this.mixinTemplate('Agregado correctamente!', true))
        .catch((err) => this.mixinTemplate(err, false));
    }
  }

  async editarPersona(persona: Persona, indice: number) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Persona',
      html: `
        <input id="swal-input1" class="swal2-input" value="${persona.id}">
        <input id="swal-input2" class="swal2-input" value="${persona.nombre}">
        <input id="swal-input3" class="swal2-input" value="${persona.apellidos}">
        <input id="swal-input4" class="swal2-input" value="${persona.idSexo}">
        <input id="swal-input5" class="swal2-input" value="${persona.edad}">
      `,
      focusConfirm: false,
      confirmButtonText: 'Editar',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
          (document.getElementById('swal-input4') as HTMLInputElement).value,
          (document.getElementById('swal-input5') as HTMLInputElement).value,
        ];
      },
    });

    if (formValues) {
      this.firestore
        .editarPersona(
          {
            id: parseInt(formValues[0]),
            nombre: formValues[1],
            apellidos: formValues[2],
            idSexo: parseInt(formValues[3]),
            edad: parseInt(formValues[4]),
          },
          indice
        )
        .then(() => this.mixinTemplate('Editado correctamente!', true))
        .catch((err) => this.mixinTemplate(err, false));
    }
  }

  eliminarPersona(indice: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.firestore
          .eliminarPersona(indice)
          .then(() => this.mixinTemplate('Eliminado correctamente!', true))
          .catch((err) => this.mixinTemplate(err, false));
      }
    });
  }

  signOut() {
    this.router.navigate(['login']);
    this.auth.signOut();
  }

  mixinTemplate(msg: string, success: boolean) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: success ? 'success' : 'error',
      title: msg,
    });
  }
}
