const prereqs = {
  'ENGCOMP 3': { prereqs: [], coreqs: 'none' },
  'COM SCI 31': { prereqs: [], coreqs: 'none' },
  'COM SCI 32': { prereqs: ['COM SCI 31'], coreqs: 'none' },
  'COM SCI 33': { prereqs: ['COM SCI 31', 'COM SCI 32'], coreqs: 'none' },
  'COM SCI 1': { prereqs: [], coreqs: 'none'},
  'COM SCI 111': {prereqs: ['COM SCI 31', 'COM SCI 32', 'COM SCI 33', 'COM SCI 35L'], coreqs: 'none'},
  'MATH 31A': {prereqs: [], coreqs: 'none'},
  'GE': {prereqs: [], coreqs: 'none'},
  'PHYSICS 1A': {prereqs: [], coreqs: 'none'}
};

// assume these are in order
const allClasses = ['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3', 'MATH 31A', 'COM SCI 32', 'MATH 31B', 'PHYSICS 1A'];//, 'COM SCI 33', 'MATH 32A', 'PHYSICS 1B', 'COM SCI 35L', 'COM SCI M51A', 'MATH 32B', 'MATH 33A', 'MATH 61', 'PHYSICS 1C', 'PHYSICS 4BL', 'COM SCI 111', 'COM SCI M152A', 'MATH 33B', 'GE', 'COM SCI 118', 'COM SCI 180', 'GE', 'SCI/TECH', 'COM SCI 131', 'COM SCI M151B', 'GE', 'STATS 100A', 'COM SCI 181', 'CS ELECTIVE', 'GE', 'TBR', 'COM SCI 130', 'CS ELECTIVE', 'GE', 'SCI/TECH', 'CS ELECTIVE', 'CS ELECTIVE', 'TBR', 'CS ELECTIVE', 'SCI/TECH', 'TBR'];

const doneClasses = ['ENGCOMP 3', 'MATH 31A', 'MATH 31B'];

const classes = allClasses.filter((element) => !doneClasses.includes(element));

const numQuarters = 12;

// checks if nextClass causes a conflict in quarterRow
// returns true if there is a conflict
const findConflict = (nextClass, quarterRow) => {
  for (let i = 0; i < quarterRow.length; i++) {
    // get prereqs for next class
    const classPrereqs = prereqs[nextClass].prereqs;
    for (let j = 0; j < classPrereqs.length; j++) {
      if (classPrereqs[j] === quarterRow[i]) {
        return true;
      }
    }
  }
  return false;
};

// checks if row is already full (no undefineds)
const fullRow = (quarterRow) => {
  for(let i = 0; i < quarterRow.length; i++) {
    if (quarterRow[i] === undefined) {
      return false;
    }
  }
  return true;
};
console.log(findConflict('COM SCI 32', [undefined, undefined, undefined]) === false);
console.log(findConflict('COM SCI 32', ['COM SCI 31', undefined, undefined]) === true);
console.log(findConflict('COM SCI 32', ['COM SCI 1', 'COM SCI 31', undefined]) === true);
console.log(fullRow(['COM SCI 1', 'COM SCI 1', 'COM SCI 1']) === true);
console.log(fullRow(['COM SCI 1', 'COM SCI 1', undefined]) === false);


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

        // make copy of quarter row
        const rowAfterSwap = schedule[i].slice();
         // replace conflict class with next quarter class
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
          console.log(schedule);
          break;
        }
      }
    });
  }
  return schedule;
};

 const oldSchedule = [['COM SCI 31', 'COM SCI 32', 'COM SCI 33'], ['ENGCOMP 3', 'COM SCI 1', 'COM SCI 111'], ['MATH 31A', 'GE'], ['GE']];
// console.log('start', oldSchedule);
// console.log(replaceConflictedClasses(oldSchedule));

// schedule is passed by reference
// schedule is rearranged so no class conflicts exist
const rearrangeForConflicts = (classes, schedule) => {
  // iterate through list of classes
  // if a conflict is found, move to next quarter
  // otherwise, keep trying to fill the quarter
  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].length; j++) {
      schedule[i][j] = undefined;
    }
  }
  for (let i = 0; i < classes.length; i++) {
    let quarterIndex = 0;

    while (true) {
      const quarterRow = schedule[quarterIndex];
      if (findConflict(classes[i], quarterRow) || fullRow(quarterRow)) {
        quarterIndex++;
      }
      else {
        break;
      }
    }
    console.log(quarterIndex);
    // class should be placed in the quarter that corresponds to quarterIndex
    try {
      for (let j = 0; j < schedule[quarterIndex].length; j++)
      {
        if (schedule[quarterIndex][j]===undefined)
        {
          schedule[quarterIndex][j]=classes[i];
          break;
        }
      }
    }
    catch(err) {
      console.log('Schedule not found, ', err.message);
    }
  }
}
rearrangeForConflicts(classes, oldSchedule);
console.log(oldSchedule);

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
  createSchedule, findConflict, fullRow
}

