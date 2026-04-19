# Practical Assignment: Full-Stack Angular and Express.js Integration

## 1. Title
Implementation of a Full-Stack Web Application Using Angular Frontend and Express API.

## 2. Aim
To develop a responsive Single Page Application (SPA) utilizing Angular (`v16+`) that smoothly retrieves and renders JSON data over HTTP from a custom REST API constructed securely using Node.js and Express.

## 3. Objective
- Construct a standalone Express.js backend running on Node.js.
- Formulate a robust `GET /api/students` endpoint mapped to return generic formatted data arrays.
- Overcome Cross-Origin Resource Sharing (CORS) complications natively using Express built-ins.
- Architect an Angular framework capable of external external fetching (`HttpClient`).
- Implement Loading UI States alongside structured Reactive Observables (`Observable` / `subscribe`).
- Bind decoupled APIs securely into Frontend UI structural logic (`*ngIf`, `*ngFor`).

## 4. Theory & Core Concepts
- **What is an API?**: An Application Programming Interface (API) allows two software systems to communicate. In web applications, APIs are typically servers exposing endpoints (URLs) that applications can request data from using standard HTTP formats (like JSON). 
- **How Angular connect to backend?**: Angular connects loosely rather than being tightly coupled. It operates inside a client's browser, launching isolated outbound `HTTP Requests` towards exposed API endpoints, asynchronously waiting for a response, and then re-computing View logic using Observables.
- **Role of HttpClient**: `HttpClient` is an Angular-provided utility module representing the optimal method to manage HTTP requests. Instead of raw JS `fetch`, `HttpClient` wraps data securely into `Observables`. Observables permit simplified cancellation, powerful testing, and native integration directly matching standard RxJS handling pipelines mapping clean functional reactivity paradigms.

## 5. Tools Used
- Node.js & NPM (Node Package Manager)
- Angular CLI
- Express.js + CORS middleware
- Basic DOM CSS

## 6. Procedure: Step-by-Step Setup

### A. Backend Setup (`Node.js/Express`)
1. Create a `backend` directory inside your project.
2. Initialize Node layout: `npm init -y`
3. Install necessary APIs packages: `npm install express cors`
4. Setup logic creating your `server.js` backend server document.
5. Boot system server permanently: `node server.js`

### B. Frontend Setup (`Angular`)
1. Create frontend mapping cleanly through Angular CLI: `ng new frontend --routing --style css`
2. Enter the created folder: `cd frontend`
3. Scaffold core architectural elements:
   - `ng generate component components/home`
   - `ng generate component components/students`
   - `ng generate service services/student`
4. Register the fundamental `HttpClientModule` globally over `app.module.ts`.
5. Develop component logic observing `server.js` output paths explicitly mapping `http://localhost:3000`.
6. Start Angular deployment process natively representing Frontend UI: `ng serve -o`

---

## 7. Code Snippets

### Backend: `server.js`
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS cleanly to allow Angular standard localhost port access
app.use(cors());

// Define REST API URL Path Target Mapping
app.get('/api/students', (req, res) => {
  // Static array of raw objects
  const students = [
    { id: 1, name: "Alice", course: "B.Tech", marks: 85 },
    { id: 2, name: "Bob", course: "BCA", marks: 78 },
    { id: 3, name: "Charlie", course: "MCA", marks: 92 },
    { id: 4, name: "David", course: "B.Sc", marks: 66 }
  ];
  
  // Simulated minor loading delay mapping authentic real internet situations
  setTimeout(() => {
    res.json(students);
  }, 1000); 
});

// Boot listening
app.listen(PORT, () => {
  console.log(`Backend Server API is successfully running at http://localhost:${PORT}`);
});
```

### Frontend: `app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // VERY IMPORTANT

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Enable universal Http fetching dynamically
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Frontend: `student.service.ts`
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Data blueprint interface
export interface Student {
  id: number;
  name: string;
  course: string;
  marks: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Point accurately towards Express Localhost
  private apiUrl = 'http://localhost:3000/api/students';

  // Inject standard application client inside service mapping constructor
  constructor(private http: HttpClient) { }

  // Returns asynchronous stream securely handling arrays dynamically mapped
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
}
```

### Frontend: `students.component.ts`
```typescript
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

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Utilize subscribe callback handler observing Service streams natively 
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load data. Ensure API Backend server is actively running on port 3000.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
```

### Frontend: `students.component.html` (Table & UI Layout)
```html
<div class="card">
  <h2>Students Record Database</h2>

  <!-- Handle loading state dynamically -->
  <div *ngIf="isLoading" class="alert loading-state">
    Fetching data from backend server API. Loading...
  </div>

  <!-- Handle Error API Failure smoothly -->
  <div *ngIf="errorMessage" class="alert error-state">
    {{ errorMessage }}
  </div>

  <!-- Handle valid data states mapped to UI -->
  <div *ngIf="!isLoading && !errorMessage">
    
    <div *ngIf="students.length === 0" class="empty-state">
      No student records gracefully found natively.
    </div>

    <!-- Table structured DOM looping -->
    <table *ngIf="students.length > 0">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Full Name</th>
          <th>Course Enrolled</th>
          <th>Marks Score</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let student of students">
          <td># {{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.course }}</td>
          <td [ngClass]="{'high-score': student.marks >= 80}">{{ student.marks }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## 8. Expected Functional Outputs (Placeholders)
1. **Pre-requisite Validation State**: Attempting to load `/students` when Express Backend remains powered down outputs red CSS warning alert containing: "Failed to load data. Ensure API Backend server is actively running...".
2. **Asynchronous Load Visual State**: Upon active success hit, a styled yellow/gray `Loading...` banner correctly displays temporarily confirming background data network calls correctly initiated inside `OnInit` processes native DOM lifecycles.
3. **Data Success Display UI**: The HTML table fills fully via custom JSON data generated dynamically from standard API `/api/students` payloads mirroring native Angular Two-way rendering without manually selecting explicit elements using basic loops `*ngFor`. 

## 9. Conclusion
Throughout this complex full-stack integration assignment, we effectively constructed a decoupled server-client web layout matching professional architecture paradigms. The Angular SPA explicitly connected seamlessly towards a custom Express REST HTTP backend without DOM blocking UI freezing. Combining observable states, reactive UI rendering via `*ngIf`, routing configuration logic, and functional API CORS implementations, this system successfully validated modern Data Flow application methodologies. 
