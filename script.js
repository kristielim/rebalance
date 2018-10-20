// const prereqs = {
//     'CS1': {prereqs: 'none', coreqs: 'none'},
//     'CS31': {prereqs: 'none', coreqs: 'none'},
//     'Eng Comp 3': {prereqs: 'none', coreqs: 'none'},
//     'Math 31A': {prereqs: 'Math 30B', coreqs: 'none'}
// };



const allClasses = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];

const doneClasses = [0, 1, 2, 5,];

const classes = allClasses.filter( ( element ) => !doneClasses.includes( element ) );

const numQuarters = 10;
// input classes
const createSchedule = (classes) => {
    let schedule = [];
    // iterate through list of classes
    let fourClassQuarters = classes.length % numQuarters;
    let classesPerQuarter = 4;
    for (let i = 0; i < classes.length;) {
        if (i >= fourClassQuarters*4) {
            classesPerQuarter = 3;
        }
        const quarter = classes.slice(i, i + classesPerQuarter);
        schedule.push(quarter);
        i += classesPerQuarter;
    }
    return schedule;
};
// // output {
//     '1': {fall: [], winter: [], spring: []}
// }
// [[fall], [winter], [spring]]

console.log(createSchedule(classes));