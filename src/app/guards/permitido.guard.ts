import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PermitidoGuard implements CanActivate {

  constructor(
    private router: Router,
    private authservice: AuthService, 
    private toastcontroller: ToastController
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarAcceso();
  }

  private verificarAcceso(): boolean {
    if (this.authservice.EstaLogueado()) {
      // Usuario está autenticado, permitir acceso
      return true;
    }

    // Usuario no está autenticado, mostrar mensaje y redirigir a la página de inicio de sesión
    this.mostrarToast("Debe iniciar sesión para acceder a esta página");
    this.router.navigate(['/login']);
    return false;
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastcontroller.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}

