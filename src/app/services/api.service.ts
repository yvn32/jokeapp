import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php'
  
  constructor(private http: HttpClient) { }

  // F1 - REGISTRO
  registrarPersona(correo, pwd, nombre, apellido) {
    let that = this;
    console.log('Estoy en registrarPersona de api.service.ts');
    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioAlmacenar",
        parametros: [correo, pwd, nombre, apellido]
      }).toPromise())
    })
  }

  // F2 - INICIO DE SESIÓN
  autenticar(correo, pwd) {
    let that = this;
    console.log('Estoy en autenticar de api.service.ts');
    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioLogin",
        parametros: [correo, pwd]
      }).toPromise())
    })
  }

  obtenerNombre(correo) {
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.get(that.rutaBase + '?nombreFuncion=UsuarioObtenerNombre&correo=' + correo).toPromise())
    })
  }

  // F3 - CAMBIO DE CONTRASEÑA
  cambiarPwd(correo, curPwd, newPwd) {
    let that = this;
    console.log('Estoy en cambiarPwd de api.service.ts');
    return new Promise(resolve => {
      resolve(that.http.patch(that.rutaBase, {
        nombreFuncion: "UsuarioModificarContrasena",
        parametros: [correo, curPwd, newPwd]
      }).toPromise())
    })
  }
 
}
