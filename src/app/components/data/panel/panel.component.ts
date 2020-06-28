import { Component } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

export interface Persona {
  id: number;
  nombre: string;
  apellidos: string;
  idSexo: number;
  edad: number;
}

const ELEMENT_DATA: Persona[] = [
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 4, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
  { id: 1, nombre: 'Cristian', apellidos: 'González', idSexo: 1, edad: 21 },
];

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Personas');
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidos',
    'idSexo',
    'edad',
    'buttons',
  ];
  dataSource = ELEMENT_DATA;

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
      Swal.fire(JSON.stringify(formValues));
    }
  }

  async editarPersona(persona: Persona) {
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
      Swal.fire(JSON.stringify(formValues));
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
        this.mixinTemplate('Eliminado correctamente!', true);
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
