
export interface RespuestaFeriados {
    status: string;
    data: Data[];
}

export interface Data {
    date: string;
    title: string;
    type: string;
    inalienable: boolean;
    extra: string;
}
//interface utilizada para get, put, delete
export interface Idocentes{
    id: number;
    username: String;
    correo: String;
    role: String;
    isactive: boolean;
    asignatura1: String;
    anno1: String;
    semestre1: String;
    horaTotal1: number;
    asignatura2: String;
    anno2: String;
    semestre2: String;
    horaTotal2: number;
    password: String;
    confirmarPassword: String;
}
//petición post
export interface Idocente{
    username: String;
    correo: String;
    role: String;
    isactive: boolean;
    asignatura1: String;
    anno1: String;
    semestre1: String;
    horaTotal1: number;
    asignatura2: String;
    anno2: String;
    semestre2: String;
    horaTotal2: number;
    password: String;
    confirmarPassword: String;
}
//petición get
export interface Users{
    id:number;
    username:String;
    password:String;
    role:String;
    isactive:boolean
}