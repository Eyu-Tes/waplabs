let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        this.students.forEach(function (student) {
            console.log(this.title + ": " + student
            );
        });
    }
};

// method 1
// declare a const self to hold the 'this' of enclosing object
/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        const self = this;
        this.students.forEach(function (student) {
            console.log(this.title + ": " + student
            );
        });
    }
};
 */

// method 2
// pass another parameter to forEach function to hold the 'this' of enclosing object
/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        this.students.forEach(function (student) {
            console.log(this.title + ": " + student
            );
        }, this);
    }
};
*/

// method 3
// call the bind method on the arrow function and pass the 'this' of enclosing object
/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        //const self = this;
        this.students.forEach(function (student) {
            console.log(this.title + ": " + student
            );
        }.bind(this));
    }
};
*/

// method 4
// use arrow function instead of the call back function
// to hold the 'this' of enclosing object since arrow function does not have its own
// 'this' it will look for the surrounding 'this'

/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        this.students.forEach((student)  =>{
            console.log(this.title + ": " + student
            );
        });
    }
};
 */

// method 5
// use call to bind 'this' and wrap it in an arrow function
/*
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function () {
        this.students.forEach(student => (function(student) {
                console.log(this.title + ": " + student
            );
        }.call(this)));
    }
};
 */


group.showList()
