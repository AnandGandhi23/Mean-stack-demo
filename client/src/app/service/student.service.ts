import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../model/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private APIRoot = environment.serverUrl;
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(`${this.APIRoot}/student/get-all-students`);
  }

  filterStudents(filter: string) {
    return this.http.get(
      `${this.APIRoot}/student/get-student-by-search/${filter}`
    );
  }

  getStudentById(id: string): Promise<APIResponse | undefined> {
    return this.http
      .get<APIResponse>(`${this.APIRoot}/student/get-student-by-id/${id}`)
      .toPromise();
  }

  createStudent(studentData: any) {
    return this.http.post(`${this.APIRoot}/student`, studentData);
  }

  deleteStudent(id: string) {
    return this.http.delete(
      `${this.APIRoot}/student/delete-student-by-id/${id}`
    );
  }
}
