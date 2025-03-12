import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cancion } from '../../models/canciones.model';
import { CancionesService } from '../../services/canciones.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-canciones',
  imports: [FormsModule],
  templateUrl: './canciones.component.html',
  styleUrl: './canciones.component.css'
})
export class CancionesComponent {

  canciones: any;
  cancion = new Cancion();

  constructor(private cancionesService:CancionesService){
    this.getCanciones();
  }

  async getCanciones():Promise<void>{
    this.canciones = await firstValueFrom(this.cancionesService.getCanciones());
  }

  insertarCancion(){
    this.cancionesService.agregarCanciones(this.cancion);
    this.getCanciones();
    this.cancion = new Cancion();
  }

  selectCancion(cancionSeleccionada:Cancion){
    this.cancion = cancionSeleccionada;
  }

  updateCancion(){
    this.cancionesService.modificarCancion(this.cancion);
    this.getCanciones();
    this.cancion = new Cancion();
  }

  deleteCancion(id: string){
    this.cancionesService.eliminarCancion(id)
      .then(() => this.getCanciones())
      .catch(error => console.error('Error al eliminar la canción: ', error));

      this.cancion = new Cancion();
  }
}
