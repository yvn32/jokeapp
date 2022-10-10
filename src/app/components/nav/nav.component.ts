import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(private alertController: AlertController, private api: ApiService, private toastController: ToastController) { }

  ngOnInit() {}

  // F3 - CAMBIO DE CONTRASEÑA
  async formCambioPwd() {
    const cambioPwd = await this.alertController.create({
      header: 'Cambiar contraseña',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Ok',
          handler: datos => this.cambiarPwd(datos.correo, datos.curPwd, datos.newPwd, datos.repPwd),
        }
      ],
      inputs: [
        {
          placeholder: 'Correo',
          name: 'correo',
        },
        {
          placeholder: 'Contraseña actual',
          type: 'password',
          name: 'curPwd',
        },
        {
          placeholder: 'Nueva contraseña',
          type: 'password',
          name: 'newPwd',
        },
        {
          placeholder: 'Repetir nueva contraseña',
          type: 'password',
          name: 'repPwd',
        },
      ],
    });
    await cambioPwd.present();
  }

  async cambiarPwd(correo, curPwd, newPwd, repPwd){
    console.log('Hay que validar el cambio');
    let data = await this.api.cambiarPwd(correo, curPwd, newPwd);

    if (data['result'] === 'OK') {
      console.log('Contraseña actualizada');
      this.mostrarMensaje('Contraseña actualizada');
    } else if (data['result'] === 'ERR02') {
      console.log('Contraseña NO actualizada');
      this.mostrarMensaje('Contraseña NO actualizada');
    } else {
      console.log('Ocurrió algún error en la actualización');
      this.mostrarMensaje('No se ha podido actualizar la contraseña');
    };

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
