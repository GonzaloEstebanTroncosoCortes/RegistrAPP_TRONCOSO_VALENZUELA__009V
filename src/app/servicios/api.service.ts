import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaFeriados } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { }

  getFeriados(){
    return this.httpclient.get<RespuestaFeriados>('https://api.victorsanmartin.com/feriados/en.json');
}

}