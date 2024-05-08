function Student(firstName, lastName, grade){
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = [];
}

Student.prototype.inputNewGrade = function (newGrade){
    this.grades.push(newGrade);
}


Student.prototype.computeAverage = function () {
    if (this.grades.length === 0) {
        return 0;
    }

    let sum = this.grades.reduce((acc, curr)=> acc = acc + curr, 0)
    return sum / this.grades.length;
};


let student1 = new Student("John", "Doe");
student1.inputNewGrade(90);
student1.inputNewGrade(85);
console.log(student1.computeAverage());

let student2 = new Student("Jane", "Smith");
student2.inputNewGrade(95);
student2.inputNewGrade(88);
console.log(student2.computeAverage());