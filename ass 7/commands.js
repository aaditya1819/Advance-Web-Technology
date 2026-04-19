// switch to or create our new database
use courseDB

// create our intended collection explicitly
db.createCollection("students")

// insert one document into the collection
db.students.insertOne({ name: "Alice", age: 20, course: "B.Tech", marks: 85 })

// insert multiple documents into the collection simultaneously
db.students.insertMany([
  { name: "Bob", age: 21, course: "BCA", marks: 65 },
  { name: "Charlie", age: 22, course: "MCA", marks: 90 },
  { name: "David", age: 20, course: "B.Sc", marks: 75 },
  { name: "Eve", age: 19, course: "B.Tech", marks: 95 }
])

// display all records inside the collection
db.students.find()

// find selective records where marks are more than 70
db.students.find({ marks: { $gt: 70 } })

// display only name and course while intentionally hiding the default _id field
db.students.find({}, { _id: 0, name: 1, course: 1 })

// update a specific valid record found dynamically
db.students.updateOne({ name: "Bob" }, { $set: { course: "MCA" } })

// update all B.Tech student documents using the unique internal increment operator
db.students.updateMany({ course: "B.Tech" }, { $inc: { marks: 5 } })

// drop off the specified singular match completely from the system
db.students.deleteOne({ name: "David" })

// wipe multiple instances of documentation based on our targeted conditional threshold
db.students.deleteMany({ age: { $lt: 20 } })

// list results sequentially from top marks sequentially descending 
db.students.find().sort({ marks: -1 })

// reduce output array dimensions exclusively to 2 results mapping
db.students.find().limit(2)

// count absolute quantity of documents remaining actively intact
db.students.countDocuments()
