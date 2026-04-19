import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to load student data. Is the Express server active on port 3000?';
        this.isLoading = false;
      }
    });
  }
}
