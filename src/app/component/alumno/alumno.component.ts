import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../service/alumno.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
})
export class AlumnoComponent {
  alumnos: Alumno[] = [];
  titulo: string = '';
  opc: string = '';
  alumno = new Alumno();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private alumnoService: AlumnoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarAlumnos();
  }

  listarAlumnos() {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Alumno';
    this.opc = 'Guardar';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Alumno';
    this.opc = 'Editar';
    this.alumnoService.getAlumnoById(id).subscribe((data) => {
      this.alumno = data;
      this.op = 1;
    });
    this.visible = true;
  }

  confirmDeleteAlumno(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este alumno?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAlumno(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El alumno ha sido eliminado exitosamente',
        });
        this.listarAlumnos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el alumno',
        });
      },
    });
  }

  addAlumno(): void {
    this.alumnoService.createAlumno(this.alumno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno Registrado',
        });
        this.listarAlumnos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el alumno',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveAlumno() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar este alumno?'
          : '¿Estás seguro de que deseas editar este alumno?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  editAlumno() {
    this.alumnoService.updateAlumno(this.alumno, this.alumno.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Alumno Editado',
        });
        this.listarAlumnos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el alumno',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addAlumno();
      this.limpiar();
    } else if (this.op == 1) {
      this.editAlumno();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.alumno.id = 0;
    this.alumno.codigo = '';
    this.alumno.nombres = '';
    this.alumno.apellidos = '';
    this.alumno.fecha_nacimiento = new Date();
    this.alumno.correo = '';
  }
}
