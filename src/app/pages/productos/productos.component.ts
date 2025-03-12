import { Component } from '@angular/core';
import { Producto } from '../../models/productos.model';
import { ProductosService } from '../../services/productos.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: any;
  producto = new Producto();

  constructor(private productosService:ProductosService){
    this.getProductos();
  }

  async getProductos():Promise<void>{
    this.productos = await firstValueFrom(this.productosService.getProductos());
  }

  insertarProducto(){
    this.productosService.agregarProductos(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  selectProducto(productoSeleccionado:Producto){
    this.producto = productoSeleccionado;
  }

  updateProducto(){
    this.productosService.modificarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  deleteProducto(id: string){
    this.productosService.eliminarProducto(id)
      .then(() => this.getProductos()) // Esperamos a que la eliminación se complete antes de actualizar la lista
      .catch(error => console.error('Error al eliminar el producto:', error));
  
    this.producto = new Producto();
  }

}