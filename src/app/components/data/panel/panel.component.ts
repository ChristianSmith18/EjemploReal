import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Persona, RootPersona } from '../../../models/persona.model';
import { DatabaseService } from '../../../services/database.service';
import { MatTableDataSource } from '@angular/material/table';
declare var copyer: any;

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

  dataSource = new MatTableDataSource<Persona>();
  copyText = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private title: Title,
    private firestore: DatabaseService
  ) {
    this.title.setTitle('Personas');
    this.firestore.obtenerPersonas().subscribe((personas: RootPersona) => {
      this.dataSource.data = personas.personas;
    });
  }

  buscar(event: { target: HTMLInputElement }) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
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
          id: Number(formValues[0]),
          nombre: formValues[1],
          apellidos: formValues[2],
          idSexo: Number(formValues[3]),
          edad: Number(formValues[4]),
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
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
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
            id: Number(formValues[0]),
            nombre: formValues[1],
            apellidos: formValues[2],
            idSexo: Number(formValues[3]),
            edad: Number(formValues[4]),
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
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
      .fire({
        title: '¿Seguro/a que deseas salir?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      })
      .then((result) => {
        if (result.value) {
          this.router.navigate(['login']);
          this.auth.signOut();
        }
      });
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

  buscarPorID(id: number): number {
    let indice = 0;
    for (const persona of this.dataSource.data) {
      if (persona.id === id) {
        return indice;
      }
      indice++;
    }
    return indice;
  }

  copiarEnPortapapeles(id: number) {
    this.copyText = `
    ID: ${this.dataSource.data[this.buscarPorID(id)].id} ~
    Nombre: ${this.dataSource.data[this.buscarPorID(id)].nombre} ~
    Apellidos: ${this.dataSource.data[this.buscarPorID(id)].apellidos} ~
    Sexo: ${
      this.dataSource.data[this.buscarPorID(id)].idSexo === 1
        ? 'Masculino'
        : 'Femenino'
    } ~
    Edad: ${this.dataSource.data[this.buscarPorID(id)].edad}
    `;
    setTimeout(() => {
      copyer('copyer');
      const input = document.getElementById('mat-input-0') as HTMLInputElement;
      input.focus();
      input.blur();
      this.mixinTemplate('Copiado en el portapeles', true);
    }, 300);
  }
}
