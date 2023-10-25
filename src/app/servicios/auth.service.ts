import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../pages/interfaces/interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, 
              private router: Router) { }

  // Obtener todos los usuarios
  GetAllUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/docentes`);
  }

  // Obtener un usuario por su código
  GetUserById(codigo: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/docentes/?username=${codigo}`);
  }

  // Verificar si el usuario está logueado
  EstaLogueado() {
    return sessionStorage.getItem('username') != null;
  }

  // Cerrar sesión
  logout() {
    // Limpiar la sesión
    sessionStorage.clear();
    // Redirigir al usuario al login
    this.router.navigate(['/login']);
  }
}
