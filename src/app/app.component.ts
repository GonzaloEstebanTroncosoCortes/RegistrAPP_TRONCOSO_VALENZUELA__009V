import { Component } from '@angular/core';

interface Componente {
  name: string;
  redirecTo: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes: Componente[] = [

    {
      name: 'Inicio',
      redirecTo: '/inicio',
      icon: 'home'
    },
    {
      name: 'Login',
      redirecTo: '/login',
      icon: 'log-in'
    },
    {
      name: 'Registro',
      redirecTo: '/registro',
      icon: 'person-add'
    },
    {
      name: 'Informacion',
      redirecTo: '/informacion',
      icon: 'information-circle'
    },
    {
      name: 'Feriados',
      redirecTo: '/feriados',
      icon: 'calendar'
    },
    {
      name: 'Salir',
      redirecTo: '/salir',
      icon: 'log-out'
    }

  ];
  constructor() {}
}
