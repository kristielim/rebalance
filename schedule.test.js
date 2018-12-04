var schedule = require('./schedule');
var assert = require('assert');


describe('Schedule', function () {

describe('#createSchedule()', function(){
  it('should partition the quarter', function () {
    const classes = ['COM SCI 1', 'COM SCI 31', 'COM SCI 32', 'ENGCOMP 3', 'COM SCI 33', 'PHYSICS 1A', 'GE','MATH 31A'];
    const s = schedule.createSchedule(classes, 3);
    assert.deepEqual(s,[['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3'], ['COM SCI 32', 'PHYSICS 1A', 'GE'], ['COM SCI 33','MATH 31A' ] ]);
  });

});


  describe('#rearrangeForConflicts()', function () {
    it('should replace CS32 with EngComp3', function () {
      const classes = ['COM SCI 31', 'COM SCI 32', 'ENGCOMP 3'];
      const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3']];
      const newSchedule = schedule.rearrangeForConflicts(classes, oldSchedule);
      assert.deepEqual(newSchedule, [['COM SCI 31', 'ENGCOMP 3'], ['COM SCI 32']]);
    });

    it('should replace the conflicted class twice', function () {
      const classes = ['COM SCI 1', 'COM SCI 31', 'COM SCI 32', 'ENGCOMP 3', 'COM SCI 33'];
      const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3', 'COM SCI 33'], ['COM SCI 1']];
      const newSchedule = schedule.rearrangeForConflicts(classes, oldSchedule);
      assert.deepEqual(newSchedule, [['COM SCI 1', 'COM SCI 31'],
      ['COM SCI 32', 'ENGCOMP 3'],
      ['COM SCI 33']]);
    });

    it('should return false since no schedule can be found', function () {
      const classes = ['COM SCI 1', 'COM SCI 31', 'COM SCI 32', 'ENGCOMP 3', 'COM SCI 33'];
      const oldSchedule = [['COM SCI 31', 'COM SCI 32', 'COM SCI 33'], ['ENGCOMP 3', 'COM SCI 1']];
      const newSchedule = schedule.rearrangeForConflicts(classes, oldSchedule);
      assert.deepEqual(newSchedule, false);
    });

    it('should rearrange for conflicts', function () {
      const classes = ['COM SCI 1', 'COM SCI 31', 'COM SCI 32', 'ENGCOMP 3', 'COM SCI 33', 'PHYSICS 1A', 'GE','MATH 31A'];
      const oldSchedule = [['COM SCI 1', 'COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3','COM SCI 33', 'PHYSICS 1A'], ['GE', 'MATH 31A']];
      const newSchedule = schedule.rearrangeForConflicts(classes, oldSchedule);
      assert.deepEqual(newSchedule, [['COM SCI 1', 'COM SCI 31', 'ENGCOMP 3'], ['COM SCI 32', 'PHYSICS 1A', 'GE'], ['COM SCI 33','MATH 31A' ] ]);
    });

    it('should rearrange for conflicts', function () {
      const classes = ['COM SCI 1', 'COM SCI 31', 'COM SCI 32', 'COM SCI 33', 'PHYSICS 1A', 'PHYSICS 1B','MATH 31A', 'ENGCOMP 3'];
      const oldSchedule = [['COM SCI 1', 'COM SCI 31', 'COM SCI 32'], ['COM SCI 33', 'PHYSICS 1A', 'PHYSICS 1B'], ['MATH 31A', 'ENGCOMP 3']];
      const newSchedule = schedule.rearrangeForConflicts(classes, oldSchedule);
      assert.deepEqual(newSchedule, [['COM SCI 1', 'COM SCI 31', 'PHYSICS 1A'], ['COM SCI 32', 'PHYSICS 1B', 'MATH 31A'], ['COM SCI 33','ENGCOMP 3' ] ]);
    });


  });
  describe('Find conflict', function(){
    it('should not find a conflict', function(){
      assert.ok(!(schedule.findConflict('COM SCI 32', [undefined, undefined, undefined] ) ) );
    });
    it('should find a conflict', function(){
      assert.ok((schedule.findConflict('COM SCI 32', ['COM SCI 31', undefined, undefined]) ) );
    });
    it('should find a conflict', function(){
      assert.ok((schedule.findConflict('COM SCI 32', ['COM SCI 1', 'COM SCI 31', undefined]) ) );
    }); 
  });

  describe('Full row', function(){
    it('should return true for full row', function(){
      assert.ok((schedule.fullRow(['COM SCI 1', 'COM SCI 1', 'COM SCI 1']) ) );
    });
    it('should return false for full row', function(){
      assert.ok(!(schedule.fullRow(['COM SCI 1', 'COM SCI 1', undefined]) ) );
    });
  });

});


