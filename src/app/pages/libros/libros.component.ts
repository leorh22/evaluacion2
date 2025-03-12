import { Component } from '@angular/core';
import { Libro } from '../../models/libros.model';
import { LibrosService } from '../../services/libros.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libros',
  imports: [FormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  libros: any;
  libro = new Libro();

  constructor(private librosService:LibrosService){
    this.getLibros();
  }

  async getLibros():Promise<void>{
    this.libros = await firstValueFrom(this.librosService.getLibros());
  }

  insertarLibro(){
    this.librosService.agregarLibros(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  selectLibro(libroSeleccionado:Libro){
    this.libro = libroSeleccionado;
  }

  updateLibro(){
    this.librosService.modificarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  deleteLibro(id: string){
    this.librosService.eliminarLibro(id)
      .then(() => this.getLibros())
      .catch(error => console.error('Error al eliminar el libro'));
    
    this.libro = new Libro();
  }

}
