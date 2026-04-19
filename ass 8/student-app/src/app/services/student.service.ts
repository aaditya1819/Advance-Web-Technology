import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Alice', age: 20, course: 'Computer Science' }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    student.id = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    this.students.push(student);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
  }
}
