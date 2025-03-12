import { Injectable, inject } from '@angular/core';
import { Cancion } from '../models/canciones.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  getCanciones(){
    const cancionesCollection = collection(this.db, 'canciones')
    return collectionData((cancionesCollection), {idField: 'id'}).pipe(first())
  }

  agregarCanciones(cancion:Cancion){
    const cancionesCollection = collection(this.db, 'canciones')
    const cancionData = {
      nombre: cancion.nombre,
      artista: cancion.artista,
      album: cancion.album,
      calificacion: cancion.calificacion
    };
    addDoc(cancionesCollection, cancionData);
  }

  modificarCancion(cancion:Cancion){
    const documentRef = doc(this.db, 'canciones', cancion.id);
    updateDoc(documentRef, {
      nombre: cancion.nombre,
      artista: cancion.nombre, 
      album: cancion.album,
      calificacion: cancion.calificacion
    });
  }

  eliminarCancion(id: string){
    const documentRef = doc(this.db, 'canciones', id);
    return deleteDoc(documentRef);
  }
}
