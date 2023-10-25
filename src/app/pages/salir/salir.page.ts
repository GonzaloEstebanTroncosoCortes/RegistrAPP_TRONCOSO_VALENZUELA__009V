import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.page.html',
  styleUrls: ['./salir.page.scss'],
})
export class SalirPage implements OnInit {

  constructor(private menuController: MenuController,
              private authService: AuthService,
              private router: Router,
              private toascontroller: ToastController,) { }

  ngOnInit() {
    this.onLogout();
  }
  mostrarMenu(){
    this.menuController.open('primero');
  }
  onLogout() {
    this.authService.logout();  // Esto se encarga de limpiar los datos de la sesión.
    this.showToast('Has cerrado sesión exitosamente.');  // Esto muestra el mensaje de alerta.
    this.router.navigate(['/inicio']);  // Esto redirige al usuario a la página de inicio después de cerrar sesión.
  }
  async showToast(message: string) {
    const toast = await this.toascontroller.create({
      message: message,
      duration: 5000,  
      position: 'top'  
    });
  
    toast.present();
  }
}
