import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from 'src/app/model/student.model';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-preview-student',
  templateUrl: './preview-student.component.html',
  styleUrls: ['./preview-student.component.scss'],
})
export class PreviewStudentComponent {
  id: any;
  student: any = {};

  constructor(
    private studentService: StudentService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.getStudent();
  }

  async getStudent() {
    const response: APIResponse | undefined =
      await this.studentService.getStudentById(this.id);
    this.student = response?.student;
  }
}
