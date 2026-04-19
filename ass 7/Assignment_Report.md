# Practical Assignment: MongoDB Database and CRUD Operations

## 1. Title
Implementation of MongoDB Local Database, Data Insertion, and CRUD Operations.

## 2. Aim
To demonstrate creating a local database, inserting sample data, and performing CRUD (Create, Read, Update, Delete) operations using the MongoDB shell.

## 3. Objective
- Understand how to start and use the MongoDB shell locally.
- Learn shell commands for creating databases and collections.
- Perform basic Create, Read, Update, and Delete operations on documents.
- Use advanced querying techniques like projection, sorting, limiting, and counting.

## 4. Theory
MongoDB is a NoSQL, document-oriented database that stores data in a JSON-like format called BSON. Instead of traditional tables and rows, it uses conceptual collections and documents, which allows for flexible, dynamic, and scalable data models. CRUD stands for Create, Read, Update, and Delete, which are the four foundational operations of any persistent storage. The MongoDB shell (`mongosh`) is an interactive JavaScript interface to MongoDB. It lets users connect directly to their database to query, update, and manage data efficiently without a graphical user interface (GUI).

## 5. Tools Used
- MongoDB Community Server (Local Environment)
- MongoDB Shell (`mongosh`)

## 6. Procedure: Running MongoDB Locally
1. **Ensure MongoDB is installed**: Check that both the MongoDB Community Server and MongoDB Shell (`mongosh`) are installed on your system.
2. **Start the database service**: MongoDB usually runs as a background service on Windows/Mac. You can also start it via command line or Services.
3. **Open Terminal/Command Prompt**: Open the default CLI of your operating system.
4. **Launch the MongoDB Shell**: Type `mongosh` and press Enter to connect to the default locally running MongoDB instance at `mongodb://localhost:27017`.

---

## 7. Commands & Specific Operations

### Part 1: Database Setup
```javascript
// Switch to 'courseDB' or automatically create it if it doesn't already exist.
use courseDB

// Explicitly create the 'students' collection to store our documents.
db.createCollection("students")
```

### Part 2 & Part 3.1: Create Operations (Insert Data)
```javascript
// Insert a single student document into the collection.
db.students.insertOne({ name: "Alice", age: 20, course: "B.Tech", marks: 85 })

// Insert an array of multiple student documents at once.
db.students.insertMany([
  { name: "Bob", age: 21, course: "BCA", marks: 65 },
  { name: "Charlie", age: 22, course: "MCA", marks: 90 },
  { name: "David", age: 20, course: "B.Sc", marks: 75 },
  { name: "Eve", age: 19, course: "B.Tech", marks: 95 }
])
```

### Part 3.2: Read Operations
```javascript
// Retrieve and display all the documents stored in the students collection.
db.students.find()

// Retrieve only the documents that match the condition: marks strictly greater than 70.
db.students.find({ marks: { $gt: 70 } })

// Use projection to display only the name and course fields (excluding the default _id).
db.students.find({}, { _id: 0, name: 1, course: 1 })
```

### Part 3.3: Update Operations
```javascript
// Modify the first document found with the name "Bob" and set his course to "MCA".
db.students.updateOne({ name: "Bob" }, { $set: { course: "MCA" } })

// Modify multiple documents having the course "B.Tech" by increasing their marks by 5.
db.students.updateMany({ course: "B.Tech" }, { $inc: { marks: 5 } })
```

### Part 3.4: Delete Operations
```javascript
// Delete a single document matching the name "David".
db.students.deleteOne({ name: "David" })

// Delete all documents that match the condition: age strictly less than 20.
db.students.deleteMany({ age: { $lt: 20 } })
```

### Part 4: Additional Operations
```javascript
// Sort the current records by marks in descending order (from highest to lowest).
db.students.find().sort({ marks: -1 })

// Constrain the result set so that it only displays the first 2 documents.
db.students.find().limit(2)

// Measure and calculate the total count of documents currently matching the collection.
db.students.countDocuments()
```

---

## 8. Expected Outputs (Placeholders)

- **Database Switch (`use`)**: `switched to db courseDB`
- **insertOne Output**: `{ acknowledged: true, insertedId: ObjectId('...') }`
- **insertMany Output**: `{ acknowledged: true, insertedIds: { '0': ObjectId('...'), '1': ObjectId('...'), ... } }`
- **find Output (All)**: `[ { _id: ObjectId('...'), name: 'Alice', age: 20, course: 'B.Tech', marks: 85 }, ... ]`
- **updateOne Output**: `{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }`
- **updateMany Output**: `{ acknowledged: true, matchedCount: 2, modifiedCount: 2 }`
- **deleteOne Output**: `{ acknowledged: true, deletedCount: 1 }`
- **deleteMany Output**: `{ acknowledged: true, deletedCount: 1 }` // deleted Eve who is 19
- **countDocuments Output**: `3` // Given Alice, Bob, and Charlie remain in the collection after deletions.

## 9. Conclusion
In this practical assignment, we seamlessly connected to a local MongoDB shell session to instantiate a new database (`courseDB`) with its primary collection (`students`). We demonstrated standard NoSQL query mechanics by running CRUD operations: inserting individual and batched data, reading records utilizing distinct filters and projections, applying the `$set` and `$inc` modifiers to update data, and securely deleting objects matching defined criteria. We solidified our knowledge by chaining advanced aggregation tools like sorting, defining document limits, and calculating document counts entirely via the `mongosh` command prompt environment.
