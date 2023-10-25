import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { Data } from '../interfaces/interfaces';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  datos: Data[] = [];

  constructor(private menuController: MenuController,
              private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getFeriados().subscribe(resp => {
      console.log(resp);
      this.datos.push(...resp.data);
    })
  }

  mostrarMenu(){
    this.menuController.open('primero');
  }

}
