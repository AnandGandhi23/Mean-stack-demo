import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListingComponent } from './component/student-listing/student-listing.component';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { PreviewStudentComponent } from './component/preview-student/preview-student.component';

const routes: Routes = [
  { path: 'dashboard', component: StudentListingComponent },
  { path: 'createStudent', component: CreateStudentComponent },
  { path: 'editStudent/:id', component: CreateStudentComponent },
  { path: 'previewStudent/:id', component: PreviewStudentComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
