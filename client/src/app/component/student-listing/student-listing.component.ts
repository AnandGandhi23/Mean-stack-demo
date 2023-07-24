import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss'],
})
export class StudentListingComponent {
  students: any = [];
  searchFilter$ = new Subject<any>();
  constructor(
    private studentService: StudentService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.getStudents();

    this.searchFilter$.pipe(debounceTime(600)).subscribe((event) => {
      this.filterStudents((<HTMLTextAreaElement>event.target).value);
    });
  }

  getStudents() {
    try {
      this.spinner.show();
      this.studentService.getAllStudents().subscribe((res: any) => {
        this.students = res;
        this.spinner.hide();
      });
    } catch (error) {
      console.log('-> Error occurred while getting students: ', error);
    } finally {
      this.spinner.hide();
    }
  }

  filterStudents(value: string) {
    try {
      this.spinner.show();
      if (value) {
        this.studentService.filterStudents(value).subscribe((res: any) => {
          this.students = res;
          this.spinner.hide();
        });
      } else {
        this.getStudents();
      }
    } catch (error) {
      console.log('-> Error occurred while filtering students: ', error);
    } finally {
      this.spinner.hide();
    }
  }

  onPreview(id: string) {
    this.router.navigate([`/previewStudent/${id}`]);
  }

  onEdit(id: string) {
    this.router.navigate([`/editStudent/${id}`]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure want to delete')) {
      try {
        this.spinner.show();
        this.studentService.deleteStudent(id).subscribe((res: any) => {
          if (res.status === 'success') {
            this.students = this.students.filter(
              (record: any) => record._id !== id
            );
            this.spinner.hide();
          }
        });
      } catch (error) {
        console.log('-> Error occurred while deleting a student: ', error);
      } finally {
        this.spinner.hide();
      }
    }
  }
}
