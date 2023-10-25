import { Component, OnInit } from '@angular/core';
import { Idocente } from '../interfaces/interfaces';
import { ApicrudService } from 'src/app/servicios/apicrud.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newDocente: Idocente = {
    username: "",
    correo: "",
    role: "",
    isactive: false,
    asignatura1: "",
    anno1: "",
    semestre1:"",
    horaTotal1: 0,
    asignatura2: "",
    anno2: "",
    semestre2:"",
    horaTotal2: 0,
    password: "",
    confirmarPassword: ""
  }
  registrarForm: FormGroup;
  
  constructor(private authservice: AuthService,
              private apicrud: ApicrudService,
              private router: Router,
              private alertcontroller: AlertController,
              private toascontroller: ToastController,
              private menuController: MenuController,
              private builder : FormBuilder) {
                //para validar el rango de horas1
                // Definir la función de validación directamente en el constructor.
                const rangoValido = (control: AbstractControl): { [key: string]: boolean } | null => {
                  const valor = control.value;
                  if (valor !== null && (isNaN(valor) || valor < 0 || valor > 20)) {
                    // El valor no está en el rango permitido.
                    return { 'rangoInvalido': true };
                  }
                  // La validación es exitosa si retornamos null.
                  return null;
                };
                //fin de la validacion del rango de horas1

                this.registrarForm=this.builder.group({ 
                  'username' : new FormControl("",[Validators.required, Validators.minLength(8)]),
                  'correo': new FormControl(null, [Validators.required, Validators.email]),
                  'role' : new FormControl("",[Validators.required, Validators.minLength(5)]),
                  'asignatura1' : new FormControl("",[Validators.required, Validators.minLength(5)]),
                  'anno1' : new FormControl("",[Validators.required, Validators.minLength(4)]),
                  'semestre1' : new FormControl("",[Validators.required, Validators.maxLength(1)]),
                  'horaTotal1': new FormControl("", [Validators.required, rangoValido]), // Usa la función de validación aquí.
                  'asignatura2' : new FormControl("",[Validators.required, Validators.minLength(5)]),
                  'anno2' : new FormControl("",[Validators.required, Validators.minLength(4)]),
                  'semestre2' : new FormControl("",[Validators.required, Validators.maxLength(1)]),
                  'horaTotal2': new FormControl("", [Validators.required, rangoValido]), // Usa la función de validación aquí.
                  'password' : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'confirmarPassword' : new FormControl("", [Validators.required, Validators.minLength(8),]),
                }, {
                  validators: this.MustMatch('password', 'confirmarPassword')
                })
               }

  

  ngOnInit() {
  }

 
 
  mostrarMenu(){
    this.menuController.open('primero');
  }

  checkValue(event: any) {
    console.log('Checkbox value:', event.detail.checked);
    this.newDocente.isactive = event.detail.checked;
  }

  CrearDocente() {
    console.log("Creando docente...");
    console.log("Valor de isactive:", this.newDocente.isactive); // Asegúrate de que esto muestre el valor correcto

    // Aquí, manejamos la respuesta del observable y añadimos manejo de errores.
    this.apicrud.CrearDocente(this.newDocente).subscribe(
      response => {
        console.log("Respuesta del servidor:", response);
        // Añade cualquier lógica adicional en caso de respuesta exitosa, como redirección
        this.router.navigateByUrl('/login');
      },
      error => {
        console.error("Hubo un error al crear el docente:", error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
// Método MustMatch para verificar que las dos contraseñas sean iguales.
MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // Si otro validador encontró un error en uno de los controles, no es necesario
    if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
      return;
    }

    // Establecer error en caso de que la validación falle.
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ 'MustMatch': true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}


}
