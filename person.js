class Person{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	greeting(){
		console.log(`My name is ${this.name} and I am ${this.age}`);
		console.log('I exist in ' + __filename);
	}
}

module.exports = Person;
