import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Persona, RootPersona } from '../models/persona.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  personas$ = new Subject();
  personas: Persona[] = [];
  constructor(private firestore: AngularFirestore) {
    this.obtenerPersonas().subscribe((data: RootPersona) => {
      this.personas = data.personas;
    });
  }

  obtenerPersonas() {
    return this.firestore
      .collection('usuarios')
      .doc('gendarmeria')
      .valueChanges();
  }

  actualizarPersonas() {
    return this.firestore
      .collection('usuarios')
      .doc('gendarmeria')
      .set({ personas: this.personas }, { merge: true });
  }

  agregarPersona(persona: Persona) {
    this.personas.unshift(persona);
    return this.actualizarPersonas();
  }

  editarPersona(persona: Persona, posicion: number) {
    this.personas[posicion] = persona;
    return this.actualizarPersonas();
  }

  eliminarPersona(posicion: number) {
    this.personas.splice(posicion, 1);
    return this.actualizarPersonas();
  }
}
