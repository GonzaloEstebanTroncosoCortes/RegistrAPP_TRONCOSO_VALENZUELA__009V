import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Idocente,Idocentes } from '../pages/interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  //PETICION GET
  constructor(private httpclient:HttpClient) { }
  listarDocentes():Observable<Idocentes>{
    return this.httpclient.get<Idocentes>(`${environment.apiUrl}/docentes`);
  }
  //PETICION POST
  CrearDocente(newDocente:Idocente):Observable<Idocente>{
    return this.httpclient.post<Idocentes>(`${environment.apiUrl}/docentes`,newDocente);
  }


}
