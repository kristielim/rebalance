const prereqs = {
  'ENGCOMP 3': { prereqs: [], coreqs: 'none' },
  'COM SCI 31': { prereqs: [], coreqs: 'none' },
  'COM SCI 32': { prereqs: ['COM SCI 31'], coreqs: 'none' },
  'COM SCI 33': { prereqs: ['COM SCI 32'], coreqs: 'none' },
  'COM SCI 1': { prereqs: [], coreqs: 'none'}
};

// assume these are in order
const allClasses = ['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3', 'MATH 31A', 'COM SCI 32', 'MATH 31B', 'PHYSICS 1A', 'COM SCI 33', 'MATH 32A', 'PHYSICS 1B', 'COM SCI 35L', 'COM SCI M51A', 'MATH 32B', 'MATH 33A', 'MATH 61', 'PHYSICS 1C', 'PHYSICS 4BL', 'COM SCI 111', 'COM SCI M152A', 'MATH 33B', 'GE', 'COM SCI 118', 'COM SCI 180', 'GE', 'SCI/TECH', 'COM SCI 131', 'COM SCI M151B', 'GE', 'STATS 100A', 'COM SCI 181', 'CS ELECTIVE', 'GE', 'TBR', 'COM SCI 130', 'CS ELECTIVE', 'GE', 'SCI/TECH', 'CS ELECTIVE', 'CS ELECTIVE', 'TBR', 'CS ELECTIVE', 'SCI/TECH', 'TBR'];

const doneClasses = ['ENGCOMP 3', 'MATH 31A', 'MATH 31B'];

const classes = allClasses.filter((element) => !doneClasses.includes(element));

const numQuarters = 12;

// checks if there is a conflict between classes within a quarter
// returns a list of classes that need to be swapped out
const findConflict = (quarterRow) => {
  const conflictList = []
  // for each class in the quarter
  for (let i = 0; i < quarterRow.length; i++) {
    const className = quarterRow[i];
    // get prereqs for class
    const classPrereqs = prereqs[className].prereqs;

    // if any of the prereqs are found in the same quarter, return the class
    for (let j = 0; j < classPrereqs.length; j++) {
      for (let k = 0; k < quarterRow.length; k++) {
        if (classPrereqs[j] === quarterRow[k]) {
          conflictList.push(className);
          break;
        }
      }
    }
  }
  return conflictList;
};

// return schedule with no conflicts
const replaceConflictedClasses = (schedule) => {
  // breaks if there is a conflict in the last quarter
  // iterate through the schedule and look for prereq conflicts
  for (let i = 0; i < schedule.length - 1; i++) {
    // this is the list of classes for a particular quarter
    const quarterRow = schedule[i];
    console.log('quarterRow', quarterRow);
    const conflictClasses = findConflict(quarterRow);
    const noConflictClasses = quarterRow.filter((element) => !conflictClasses.includes(element));

    conflictClasses.forEach((conflictClass) => {
      // swap with class in next quarter
      const nextQuarterRow = schedule[i + 1];
      for (let j = 0; j < nextQuarterRow.length; j++) {
        console.log('this happened');
        const nextQuarterClass = nextQuarterRow[j];
        // check if class can be swapped

        // replace conflict class with next quarter class
        const rowAfterSwap = quarterRow;
        const conflictIndex = rowAfterSwap.indexOf(conflictClass);
        if (conflictIndex !== -1) {
          rowAfterSwap[conflictIndex] = nextQuarterClass;
        }
        
        const conflicts = findConflict(rowAfterSwap)
        if (conflicts.length === 0) {
          schedule[i] = rowAfterSwap;
          // note that this does not preserve order
          // splice replaces class in next quarter with the conflict class of the previous quarter
          nextQuarterRow.splice(j, 1, conflictClass);
          schedule[i + 1] = nextQuarterRow;
          break;
        }
      }
    });
  }
  return schedule;
};

const oldSchedule = [['COM SCI 31', 'COM SCI 32', 'COM SCI 33'], ['ENGCOMP 3', 'COM SCI 1']];
console.log(replaceConflictedClasses(oldSchedule));

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

  schedule = replaceConflictedClasses(schedule);

  return schedule;
};

//console.log(createSchedule(classes));

module.exports = {
  replaceConflictedClasses,
  createSchedule
}