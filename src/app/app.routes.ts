import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component'; 
import { AboutComponent } from './pages/about/about.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { CancionesComponent } from './pages/canciones/canciones.component';

export const routes: Routes = [
    {
        path: 'home', 
        component: HomeComponent
    }, 
    {
        path: 'libros',
        component: LibrosComponent
    },
    {
        path: 'musica',
        component: CancionesComponent
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];
