import { Injectable } from '@angular/core';
import {environment} from "../../shared/environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {Student} from "../model/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  basePath = environment.serverBasePath;
  url: string = '/students';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return [];
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.resourcePath(), student);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.resourcePath()}/${12}`);  // Petición GET para obtener el estudiante por ID
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.resourcePath()}/${student.id}`, student);
  }
}
