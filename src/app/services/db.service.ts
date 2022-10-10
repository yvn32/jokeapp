import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;

  constructor(private router: Router) { }

  loguear(correo, nombre, apellido) {
    this.validador = true;
    let extras: NavigationExtras = {
      state: {
        nombre: nombre,
        apellido: apellido,
      }
    }
    this.router.navigate(['principal'], extras);
  }

  canActivate() {
    if(this.validador) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
