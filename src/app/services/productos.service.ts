import { Injectable, inject } from '@angular/core';
import { Producto } from '../models/productos.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  //Metodo para obtener todos los documentos de la coleeción

  getProductos(){
    const productosCollection = collection(this.db, 'productos');
    return collectionData((productosCollection), {idField: 'id'}).pipe(first())
  }

  agregarProductos(producto:Producto){
    const productosCollection = collection(this.db, 'productos')
    const productoData = {
      descripcion: producto.descripcion,
      precio: producto.precio
    };
    addDoc(productosCollection, productoData);
  }

  modificarProducto(producto:Producto){
    const documentRef = doc(this.db, 'productos', producto.id);
    updateDoc(documentRef, {
      descripcion: producto.descripcion,
      precio: producto.precio
    });
  }

  eliminarProducto(id: string) {
    const documentRef = doc(this.db, 'productos', id);
    return deleteDoc(documentRef);
  }

}