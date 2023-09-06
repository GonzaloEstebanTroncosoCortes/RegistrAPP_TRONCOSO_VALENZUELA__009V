import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }
  //el metodo menuController.open es el que se encarga de abrir y cerrar el menu lateral lo implementamos

  mostrarMenu(){
    this.menuController.open('primero');
  }

}
