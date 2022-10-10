import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  lg_correo: string = '';
  lg_pwd: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiService,
    private db: DbService
  ) { }

  ngOnInit() {
  }

  // F1 - REGISTRO
  async formRegistro() {
    const registro = await this.alertController.create({
      // message: `<img src="assets/images/logoAlert.jpg" class="logoAlert"><h1>Registrarme</h1>`,
      header: 'Registrarme',
      inputs: [
        { placeholder: 'Correo', name: 'correo', },
        { placeholder: 'Contraseña', type: 'password', name: 'pwd', },
        { placeholder: 'Repetir contraseña', type: 'password', name: 'repPwd', },
        { placeholder: 'Nombre', name: 'nombre', },
        { placeholder: 'Apellido', name: 'apellido', },
      ],
      buttons: [
        { text: 'Cancelar', },
        {
          text: 'Registrar',
          handler: (data) => {
            this.registrar(data.correo, data.pwd, data.repPwd, data.nombre, data.apellido);
            console.log("Datos enviados");
          },
        }
      ],
    });
    await registro.present();
  }

  async registrar(correo, pwd, repPwd, nombre, apellido) {
    console.log(correo);
    let data = await this.api.registrarPersona(correo, pwd, nombre, apellido);

    if (data['result'][0].RESPUESTA === 'OK') {
      console.log('Persona almacenada ok');
      this.mostrarMensaje("Cuenta creada");
    } else if (data['result'][0].RESPUESTA === 'ERR01') {
      console.log('El correo ya existe en la BD (API)');
      this.mostrarMensaje("El correo ya existe, por favor inicie sesión");
    } else {
      console.log('Ocurrió algún error')
    }
  }

  // F2 - INICIO DE SESIÓN
  async ingresar() {
    let data = await this.api.autenticar(this.lg_correo, this.lg_pwd);

    if (data['result'] === 'LOGIN OK') {
      console.log('Credenciales ok');
      this.loguear(this.lg_correo);
    } else if (data['result'] === 'LOGIN NOK') {
      console.log('Credenciales malas');
      this.mostrarMensaje('Credenciales inválidas');
    } else {
      console.log('Ocurrió algún error');
    };

    this.lg_correo = '';
    this.lg_pwd = '';
  }

  async loguear(correo) {
    let data = await this.api.obtenerNombre(correo);
    this.db.loguear(correo, data['result'][0].NOMBRE, data['result'][0].APELLIDO);
  }

  // § - MÉTODOS COMUNES
  async mostrarMensaje(msje) {
    const toast = await this.toastController.create({
      message: msje,
      duration: 4000,
      color: "dark",
      position: 'middle',
      buttons: [{
        side: 'end',
        text: 'Ok',
      }]
    });
    toast.present();
  }

}
