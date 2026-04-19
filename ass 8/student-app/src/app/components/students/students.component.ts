import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }
}
