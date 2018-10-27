const prereqs = {
    'CS1': {prereqs: 'none', coreqs: 'none'},
    'CS31': {prereqs: 'none', coreqs: 'none'},
    'Eng Comp 3': {prereqs: 'none', coreqs: 'none'},
    'Math 31A': {prereqs: 'Math 30B', coreqs: 'none'}
};

const allClasses = ['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3', 'MATH 31A', 'COM SCI 32', 'MATH 31B', 'PHYSICS 1A', 'COM SCI 33', 'MATH 32A', 'PHYSICS 1B', 'COM SCI 35L', 'COM SCI M51A', 'MATH 32B', 'MATH 33A', 'MATH 61', 'PHYSICS 1C', 'PHYSICS 4BL', 'COM SCI 111', 'COM SCI M152A', 'MATH 33B', 'GE', 'COM SCI 118', 'COM SCI 180', 'GE', 'SCI/TECH', 'COM SCI 131', 'COM SCI M151B', 'GE', 'STATS 100A', 'COM SCI 181', 'CS ELECTIVE', 'GE', 'TBR', 'COM SCI 130', 'CS ELECTIVE', 'GE', 'SCI/TECH', 'CS ELECTIVE', 'CS ELECTIVE', 'TBR', 'CS ELECTIVE', 'SCI/TECH', 'TBR'];

const doneClasses = ['ENGCOMP 3', 'MATH 31A', 'MATH 31B'];

const classes = allClasses.filter( ( element ) => !doneClasses.includes( element ) );

const numQuarters = 12;

// input classes
const createSchedule = (classes) => {
    // return an array that will contain classes partitioned by quarters
    let schedule = [];
    
    let maxClasses = Math.ceil(classes.length / numQuarters);
    let incompleteQuarters = numQuarters * maxClasses - classes.length;
    let completeQuarters = numQuarters - incompleteQuarters;

    // start classes per quarter as max classes
    let classesPerQuarter = maxClasses;

    // iterate through list of classes
    for (let i = 0; i < classes.length;) {

        // once all complete quarters have been filled, start using one less class per quarter
        if (i == completeQuarters * maxClasses) {
            classesPerQuarter--;
        }

        // push list of classes into schedule
        const quarter = classes.slice(i, i + classesPerQuarter);
        schedule.push(quarter);
        i += classesPerQuarter;
    }

    return schedule;
};

console.log(createSchedule(classes));