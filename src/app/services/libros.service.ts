import { inject, Injectable } from '@angular/core';
import { Libro } from '../models/libros.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  getLibros(){
    const librosCollection = collection(this.db, 'libros');
    return collectionData((librosCollection), {idField: 'id'}).pipe(first())
  }

  agregarLibros(libro:Libro){
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion
    };
    addDoc(librosCollection, libroData);
  }

  modificarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor, 
      editorial: libro.editorial, 
      anioPublicacion: libro.anioPublicacion
    });
  }

  eliminarLibro(id: string){
    const documentRef = doc(this.db, 'libros', id);
    return deleteDoc(documentRef);
  }
}
