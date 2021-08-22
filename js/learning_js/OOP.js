class Student{
    #age;
    #major = "Information";
    constructor(name, age, major){
     this.name = name;
     this.#age = age;
     this.#major = major
 
   }
 }
 const student = new Student("Aryan", 20, 'CSE');
 console.log(student.name); // Aryan
 console.log(student.#age); // SyntaxError