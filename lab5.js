// Question 1
const numbers = [1, 2, 3, 4, 5, 21, 26, 76];

function sum(arr){
    return arr.filter(elem=> elem > 20).reduce((acc, current)=>{
        return acc + current
    },0)
}

console.log(sum(numbers))



// Question 2
const stringArr = ['hello', 'airplane', 'train']
function getNewArray( arr ){
    return arr.filter( elem => elem.length >= 5 && elem.includes('a'))
}

console.log(getNewArray(stringArr))



// Question 3
const concat = (...args) => {
    return args.flatMap(arg => (Array.isArray(arg) ? arg : arg.split('')));
  };
  
const result = concat('hi', [1, 2, 3], ['Hello', 'world']);
console.log(result);



// Question 4
const students = [
    { name: 'Quincy', grades: [99, 88], courses:['cs301', 'cs303']},
    { name: 'Jason', grades: [29, 38], courses:['cs201', 'cs203']},
    { name: 'Alexis', grades: [79, 78], courses:['cs105', 'cs211'] },
    { name: 'Sam', grades: [91, 82], courses:['cs445', 'cs303'] },
    { name: 'Katie', grades: [66, 77], courses:['cs303', 'cs477'] }
];

const courseAverage = Object.assign(...students
    .filter(student => student.courses.includes('cs303'))
    .map(student => ({ [student.name]: student.grades.reduce((total, grade) => total + grade, 0) / student.grades.length }))
);

console.log(courseAverage);
