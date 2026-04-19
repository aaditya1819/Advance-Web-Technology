import { Component } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  newStudent: Student = { id: 0, name: '', age: null as any, course: '' };
  successMessage: string = '';

  constructor(private studentService: StudentService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.studentService.addStudent({ ...this.newStudent });
      this.successMessage = "Student added successfully!";
      form.resetForm();
      setTimeout(() => this.successMessage = '', 3000);
    }
  }
}
