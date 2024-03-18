import mongoose from "mongoose";

if (process.argv.length < 3) {
	console.log("Give password");
}

const password = process.argv[2];

const url = `mongodb+srv://rizal:${password}@cluster0.i6ulm2g.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person" ,personSchema);

mongoose.connect(url);

if (process.argv.length === 3) {
	console.log("phonebook:");
	Person.find({}).then(results => {
		results.forEach(person => console.log(`${person.name} ${person.number}`));
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const newPerson = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});
	newPerson.save().then(() => {
		console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
		mongoose.connection.close();
	});
}