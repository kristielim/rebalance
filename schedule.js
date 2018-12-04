const prereqs = {
  'ENGCOMP 3': { prereqs: [], coreqs: 'none' },
  'COM SCI 31': { prereqs: [], coreqs: 'none' },
  'COM SCI 32': { prereqs: ['COM SCI 31'], coreqs: 'none' },
  'COM SCI 33': { prereqs: ['COM SCI 31', 'COM SCI 32'], coreqs: 'none' },
  'COM SCI 1': { prereqs: [], coreqs: 'none'},
  'COM SCI 111': {prereqs: ['COM SCI 31', 'COM SCI 32', 'COM SCI 33', 'COM SCI 35L'], coreqs: 'none'},
  'MATH 31A': {prereqs: [], coreqs: 'none'},
  'GE': {prereqs: [], coreqs: 'none'},
  'PHYSICS 1A': {prereqs: [], coreqs: 'none'},
  'PHYSICS 1B': {prereqs: ['PHYSICS 1A'], coreqs: 'none'}
};

// assume these are in order
const allClasses = ['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3', 'MATH 31A', 'COM SCI 32', 'MATH 31B', 'PHYSICS 1A'];//, 'COM SCI 33', 'MATH 32A', 'PHYSICS 1B', 'COM SCI 35L', 'COM SCI M51A', 'MATH 32B', 'MATH 33A', 'MATH 61', 'PHYSICS 1C', 'PHYSICS 4BL', 'COM SCI 111', 'COM SCI M152A', 'MATH 33B', 'GE', 'COM SCI 118', 'COM SCI 180', 'GE', 'SCI/TECH', 'COM SCI 131', 'COM SCI M151B', 'GE', 'STATS 100A', 'COM SCI 181', 'CS ELECTIVE', 'GE', 'TBR', 'COM SCI 130', 'CS ELECTIVE', 'GE', 'SCI/TECH', 'CS ELECTIVE', 'CS ELECTIVE', 'TBR', 'CS ELECTIVE', 'SCI/TECH', 'TBR'];

const doneClasses = ['ENGCOMP 3', 'MATH 31A', 'MATH 31B'];

const classes = allClasses.filter((element) => !doneClasses.includes(element));

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

// a new schedule is created from the old schedule so no class conflicts exist
// approach is to fill in a schedule of undefined's from the classes array moving a class to the next quarter if a conflict is found
const rearrangeForConflicts = (classes, oldSchedule) => {
  // make a copy of schedule but with undefined's for classes
  const schedule = []
  for (let i = 0; i < oldSchedule.length; i++) {
    schedule.push([])
    for (let j = 0; j < oldSchedule[i].length; j++) {
      schedule[i].push(undefined);
    }
  }

  // iterate through list of classes
  // if a conflict is found, move to next quarter
  // otherwise, keep trying to fill the quarter
  for (let i = 0; i < classes.length; i++) {
    let quarterIndex = 0;

    while (true) {
      const quarterRow = schedule[quarterIndex];
      if (findConflict(classes[i], quarterRow) || fullRow(quarterRow)) {
        if (quarterIndex < schedule.length - 1) {
          quarterIndex++;
        }
        else {
          console.log('Schedule not found');
          return false;
        }
      }
      else {
        break;
      }
    }
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
      return false;
    }
  }
  return schedule;
};

// input classes
const createSchedule = (classes, numQuarters) => {
  // TODO: refactor so that you partition in a separate function
  // TODO: refactor so you only pass in the lengths of the quarter arrays, slightly more efficient but not really

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

  const newSchedule = rearrangeForConflicts(classes, schedule);

  return newSchedule;
};

module.exports = {
  rearrangeForConflicts,
  createSchedule, findConflict, fullRow
}

