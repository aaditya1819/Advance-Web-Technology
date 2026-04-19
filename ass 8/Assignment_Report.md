# Practical Assignment: Modern Angular Routing & Services

## 1. Title
Implementation of Data Management and Navigation using Angular Services and Routing.

## 2. Aim
To create a modern, modular Angular web application that demonstrates real-time data handling through Angular Services and seamless multi-page navigation using Angular Router.

## 3. Objective
- Initialize a full Angular application using Angular CLI.
- Understand and implement Angular Routing for Single Page Application (SPA) navigation.
- Implement an Angular Service as a centralized data store using Dependency Injection (DI).
- Create parent and child components interacting seamlessly.
- Employ built-in forms mapping with two-way data binding (`ngModel`) for inputs.

## 4. Theory
- **Angular Service**: A service in Angular is a class with a specific, well-defined purpose. It is typically used for data sharing, business logic, or external API calls. Instead of having components fetch or calculate data independently, they inject a service that handles it globally. The `@Injectable()` decorator makes it available anywhere in the app via Dependency Injection, often provided at the `root` level for global sharing.
- **Routing**: Angular Routing enables navigation from one view to another as users perform tasks within the application. It maps specific URL paths to localized Angular Components. Instead of loading an entire new physical HTML page from the server, the Angular Router smoothly swaps out component views dynamically inside `<router-outlet>`, creating the fast "Single Page Application" feel.
- **How they work together**: Services keep shared data intact even when navigating across different route views. If the router moves a user from the 'Add Student' component to the 'Students List' component, the underlying data array remains permanently consistent because it's safely maintained by a singleton Service injected into both components alike.

## 5. Tools Used
- Node.js & npm Packages
- Angular Framework & CLI
- TypeScript Language
- Angular Router & FormsModule

## 6. Procedure: Step-by-Step Angular CLI Commands

1. **Create the Project Structure & Base Logic**:
```bash
ng new student-app --routing --style css
cd student-app
```
2. **Generate Main Components**:
```bash
ng generate component components/home
ng generate component components/students
ng generate component components/add-student
ng generate component components/about
```
3. **Generate the Shared Service**:
```bash
ng generate service services/student
```

---

## 7. Code Snippets

### A. `app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for ngModel two-way binding
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    AddStudentComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Inject Angular basic form support
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### B. `app-routing.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AboutComponent } from './components/about/about.component';

// Define the component-route mappings
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Wildcard redirect fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### C. `student.service.ts`
```typescript
import { Injectable } from '@angular/core';

// Represents base data structure interface
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
  // Store student data in private array (singleton reference)
  private students: Student[] = [
    { id: 1, name: 'Alice', age: 20, course: 'Computer Science' }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    // Basic automatic increment ID logic simulation
    student.id = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    this.students.push(student);
  }

  deleteStudent(id: number): void {
    // Refresh the array matching against excluded id row
    this.students = this.students.filter(student => student.id !== id);
  }
}
```

### D. `add-student.component.ts`
```typescript
import { Component } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent {
  newStudent: Student = { id: 0, name: '', age: null as any, course: '' };
  successMessage: string = '';

  // Inject StudentService directly into component mapping scopes natively
  constructor(private studentService: StudentService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.studentService.addStudent({ ...this.newStudent });
      this.successMessage = "Student added successfully!";
      form.resetForm();
      setTimeout(() => this.successMessage = '', 3000); // UI dismisser setup
    }
  }
}
```

### E. `app.component.html` (Navigation layout core)
```html
<nav class="navbar">
  <div class="logo">Angular Services App</div>
  <ul class="nav-links">
    <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
    <li><a routerLink="/students" routerLinkActive="active">Students List</a></li>
    <li><a routerLink="/add-student" routerLinkActive="active">Add Student</a></li>
    <li><a routerLink="/about" routerLinkActive="active">About</a></li>
  </ul>
</nav>

<div class="container">
  <!-- Dynamic Route View Outlet Placement -->
  <router-outlet></router-outlet>
</div>
```

---

## 8. Output Visual Descriptions (Placeholders)
1. **Initial Load**: Opening `/` efficiently renders the `HomeComponent` embedded UI layer showcasing a welcome message. The global navigation statically highlights "Home".
2. **Adding Entry**: Moving directly to "Add Student" presents forms that heavily leverage two-way binding (`[(ngModel)]`). Invalid empty fields trigger integrated CSS boundary red warnings (Bonus Validation Step natively supported). A properly saved student displays a `Student added successfully!` popup automatically.
3. **Viewing Students**: Selecting `/students` shows dynamic loops mapping straight against internal updates mapped universally inside `StudentService`. Old plus active inputs are visible alongside individual distinct Delete buttons rendering smoothly dynamically.

## 9. Conclusion
During this assignment, we accurately formulated a comprehensive Modern Single Page Application natively running via Angular and TypeScript paradigms. Employing independent structural configurations verified global dependencies routing smoothly through standard Singleton Services. These distinct modules centralized essential calculations without hard re-renders matching expected standard frontend routing optimizations.
