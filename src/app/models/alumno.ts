export class Alumno {
  id: number; // Campo que podría ser autogenerado en la base de datos
  codigo: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  correo: string;

  constructor(
    id: number = 0,
    codigo: string = '',
    nombres: string = '',
    apellidos: string = '',
    fecha_nacimiento: Date = new Date(),
    correo: string = ''
  ) {
    this.id = id;
    this.codigo = codigo;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.correo = correo;
  }
}
