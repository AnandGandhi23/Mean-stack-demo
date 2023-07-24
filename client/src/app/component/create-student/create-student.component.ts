import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { ValidationUtil } from 'src/app/util/validation.util';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  public studentId: string = '';
  public student: any;
  // @ts-ignore
  public studentForm: FormGroup;
  public profileImage!: File;
  public isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    public router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.studentId = this.activatedroute.snapshot.paramMap.get('id') || '';
    this.isEdit = !!this.studentId;
  }

  async getStudent() {
    try {
      const response: any = await this.studentService.getStudentById(
        this.studentId
      );
      this.student = response.student;
    } catch (e) {
      console.log('Error occurre while fetching student data --', e);
    }
  }

  async ngOnInit() {
    this.isEdit && (await this.getStudent());
    this.studentForm = this.formBuilder.group({
      firstName: [
        this.student?.firstName || '',
        [ValidationUtil.requiredNonSpace, ValidationUtil.onlyAlphabets],
      ],
      lastName: [
        this.student?.lastName || '',
        [ValidationUtil.requiredNonSpace, ValidationUtil.onlyAlphabets],
      ],
      email: [
        this.student?.email || '',
        [ValidationUtil.requiredNonSpace, ValidationUtil.validateEmail],
      ],
      phone: [this.student?.phone || '', [ValidationUtil.validatePhone]],
      profileImage: this.student?.profileImage || '',
    });
  }

  emailClicked() {
    console.log(this.studentForm.controls['email']);
  }

  onChange(event: any) {
    this.profileImage = event.target.files[0];
  }

  onCreate() {
    if (this.studentForm.invalid) {
      return;
    }
    try {
      const studentData = this.studentForm.value;

      const formData = new FormData();
      if (this.studentId) {
        formData.append('studentId', this.studentId);
      }
      formData.append('firstName', studentData.firstName);
      formData.append('lastName', studentData.lastName);
      formData.append('email', studentData.email);
      formData.append('phone', studentData.phone);
      formData.append('profileImage', this.profileImage);

      this.studentService.createStudent(formData).subscribe(
        (res: any) => {
          console.log('res=====', res);

          if (res.status === 'success') {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('error=====', error);
        }
      );
    } catch (e) {
      console.log('Error occured while upserting a student ---', e);
    }
  }
}
