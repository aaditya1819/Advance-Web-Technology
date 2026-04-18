const apiUrl = 'http://localhost:3000/courses';

// DOM Elements
const courseForm = document.getElementById('courseForm');
const courseIdInput = document.getElementById('courseId');
const courseNameInput = document.getElementById('courseName');
const instructorNameInput = document.getElementById('instructorName');
const durationInput = document.getElementById('duration');
const feesInput = document.getElementById('fees');
const courseTableBody = document.getElementById('courseTableBody');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const messageBox = document.getElementById('messageBox');

// Load courses right when page loads
document.addEventListener('DOMContentLoaded', fetchCourses);

// Generic function to display messages to the user
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
    // disappear after 3 seconds
    setTimeout(() => {
        messageBox.className = 'message-box hidden';
    }, 3000);
}

// 1. Fetch and Display All Courses (GET)
async function fetchCourses() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch courses');
        
        const courses = await response.json();
        renderTable(courses);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Render data into the HTML table
function renderTable(courses) {
    courseTableBody.innerHTML = ''; // Clear table
    
    if (courses.length === 0) {
        courseTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No courses found. Add a course above!</td></tr>';
        return;
    }

    courses.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${course.id}</td>
            <td><strong>${course.course_name}</strong></td>
            <td>${course.instructor_name}</td>
            <td>${course.duration}</td>
            <td>$${course.fees}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editCourse(${course.id}, '${course.course_name}', '${course.instructor_name}', '${course.duration}', ${course.fees})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        `;
        courseTableBody.appendChild(tr);
    });
}

// 2. Add or Update Course (POST / PUT)
courseForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent standard page reload

    const id = courseIdInput.value;
    const courseData = {
        courseName: courseNameInput.value,
        instructorName: instructorNameInput.value,
        duration: durationInput.value,
        fees: parseFloat(feesInput.value)
    };

    try {
        let response;
        if (id) {
            // Update Existing (PUT)
            response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
        } else {
            // Add New (POST)
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
        }

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Server error');

        showMessage(data.message, 'success');
        resetForm();
        fetchCourses(); // Reload table
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// 3. Prepare Form for Edit
window.editCourse = function(id, name, instructor, duration, fees) {
    courseIdInput.value = id;
    courseNameInput.value = name;
    instructorNameInput.value = instructor;
    durationInput.value = duration;
    feesInput.value = fees;

    submitBtn.textContent = 'Update Course';
    cancelBtn.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 4. Delete Course (DELETE)
window.deleteCourse = async function(id) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        showMessage(data.message, 'success');
        fetchCourses(); // Reload table
    } catch (error) {
        showMessage(error.message, 'error');
    }
};

// Utility to reset form to "Add Mode"
window.resetForm = function() {
    courseForm.reset();
    courseIdInput.value = '';
    submitBtn.textContent = 'Save Course';
    cancelBtn.classList.add('hidden');
};
