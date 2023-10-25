import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private menuController: MenuController,
              private router: Router) { }

  ngOnInit() {
  }
  mostrarMenu(){
    this.menuController.open('primero');
  }
}
