import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListingComponent } from './component/student-listing/student-listing.component';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { PreviewStudentComponent } from './component/preview-student/preview-student.component';

@NgModule({
  declarations: [AppComponent, StudentListingComponent, CreateStudentComponent, PreviewStudentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
