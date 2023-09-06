import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private alertController: AlertController) { }

  usuario ={
    nombre:'',
    rut:'',
    correo:'',
    carrera:'',
    password:'',
    confirmarPassword:''
  }

  ngOnInit() {
  }

  async MostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Gracias!'+' '+this.usuario.nombre,
      message: 'Ha sido registrado!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  Enviar(){
    console.log('Enviado!');
    this.MostrarMensaje();
    this.usuario.nombre='';
    this.usuario.rut='';
    this.usuario.correo='';
    this.usuario.carrera='';
    this.usuario.password='';
    this.usuario.confirmarPassword='';

  }


}
