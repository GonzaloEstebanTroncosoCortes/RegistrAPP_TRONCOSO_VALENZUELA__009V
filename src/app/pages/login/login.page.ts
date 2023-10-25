import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  userdata: any;
  usuario ={
    id:0,
    username:"",
    password:"",
    role:"",
    isactive:true
  }
  
  constructor(private authservice: AuthService, 
              private router: Router,
              private alertcontroller: AlertController,
              private toascontroller: ToastController,
              private builder : FormBuilder,
              private menuController: MenuController) { 
                this.loginForm=this.builder.group({ 
                  'username' : new FormControl("",[Validators.required, Validators.minLength(8)]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
              }



  ngOnInit() {
    if (this.estaLogueado()) {
      this.mostrarAlertaYaAutenticado();
    
  }
}
  
  login(){
    console.log("Codificando login de acceso");
    if (this.loginForm.valid){
      //invocamos al servicio, enviamos el parámetro username
      this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp=>{
        this.userdata =resp;
        console.log(this.userdata);

        if (this.userdata.length>0){    //si length es mayor a cero, encontramos el objeto con su username
            this.usuario={
              id: this.userdata[0].id,
              username: this.userdata[0].username,
              password: this.userdata[0].password,
              role: this.userdata[0].role,
              isactive: this.userdata[0].isactive
            }//fin usuario
            if (this.usuario.password===this.loginForm.value.password){
              if (this.usuario.isactive){
                //iniciamos sesión 
                sessionStorage.setItem('username', this.usuario.username);
                sessionStorage.setItem('role', this.usuario.role);
                sessionStorage.setItem('ingresado', 'true');
                this.showToast("Sesión iniciada correctamente...");
                this.router.navigateByUrl("/inicio");
                this.router.navigate(['/inicio'], { queryParams: { username: this.usuario.username } });
                
              }//fin if isactive
              else{
                this.NoActivo()
                this.loginForm.reset();
              }
            }//fin if password
            else{
              this.ErrorPassword();
              this.loginForm.reset();
            }
        }//if  del lenght  (this.userdata.length>0) no encontró el usuario
        else{
          this.NoExiste();
          this.loginForm.reset();
        }
       })//fin subscribe
    }
  }//fin login

  async showToast(msg:any){
    const toast =await this.toascontroller.create({
      message: msg,
      duration: 4000
    })//fin toast
    toast.present();
  }//fin showToast

//muestra mensaje de usuario no activo
  async NoActivo(){
    const alerta = await this.alertcontroller.create({
      header: "Usuario no activo",
      message: "El usuario no está activo, contacte al administrador admin@uc.cl",
      buttons: ["OK"]
    })
    alerta.present();
    return;
  }
  async ErrorPassword(){
    const alerta = await this.alertcontroller.create({
      header: "Error de contraseña",
      message: "La contraseña no es correcta, intente nuevamente...",
      buttons: ["OK"]
    })
    alerta.present();
    return;
  }

  async NoExiste(){
    const alerta = await this.alertcontroller.create({
      header: "Usuario no existe",
      message: "El usuario no existe, Debe registrarse...",
      buttons: ["OK"]
    })
    alerta.present();
    return;
  }
  onLogout() {
    this.authservice.logout();
  }

  estaLogueado(): boolean {
    return this.authservice.EstaLogueado();
  }

  async mostrarAlertaYaAutenticado() {
    const alerta = await this.alertcontroller.create({
      header: "Sesión Activa",
      message: "Ya has iniciado sesión. No es necesario que te autentiques de nuevo. ¿Deseas ir al inicio?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ir al inicio',
          handler: () => {
            this.router.navigateByUrl("/inicio"); // Navegar al inicio o la página que consideres oportuna.
          }
        }
      ]
    });
    await alerta.present();
  }

  mostrarMenu(){
    this.menuController.open('primero');
  }
}//fin clase
