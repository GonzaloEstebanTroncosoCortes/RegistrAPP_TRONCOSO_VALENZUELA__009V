import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController) { }

  usuario ={
    correo:'',
    password:''
  }

  ngOnInit() {
  }
  async MostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Bienvenido, Usted esta Logeado!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  EnviarLogin(){
    console.log('Enviado!');
    this.MostrarMensaje();
    this.usuario.correo='';
    this.usuario.password='';
  }
}
