import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiUrl = 'http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) {}

  // Listar todos los alumnos
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  // Obtener un alumno por ID
  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo alumno
  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  // Eliminar un alumno por ID
  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un alumno existente
  updateAlumno(alumno: Alumno, id: number): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }
}
