var schedule = require('./schedule');
var assert = require('assert');


describe('Schedule', function () {
  // describe('#replaceConflictedClasses()', function () {
  //   it('should replace CS32 with EngComp3', function () {
  //     const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3']];
  //     const newSchedule = schedule.replaceConflictedClasses(oldSchedule);
  //     assert.deepEqual(newSchedule, [['COM SCI 31', 'ENGCOMP 3'], ['COM SCI 32']]);
  //   });

  //   it('should replace the conflicted class twice', function () {
  //     const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3', 'COM SCI 33'], ['COM SCI 1']];
  //     const newSchedule = schedule.replaceConflictedClasses(oldSchedule);
  //     assert.deepEqual(newSchedule, [['COM SCI 31', 'ENGCOMP 3'],
  //     ['COM SCI 32', 'COM SCI 1'],
  //     ['COM SCI 33']]);
  //   });

  //   it('should replace two conflicted classes in the same quarter', function () {
  //     const oldSchedule = [['COM SCI 31', 'COM SCI 32', 'COM SCI 33'], ['ENGCOMP 3', 'COM SCI 1']];
  //     const newSchedule = schedule.replaceConflictedClasses(oldSchedule);
  //     assert.deepEqual(newSchedule, [ [ 'COM SCI 31', 'ENGCOMP 3', 'COM SCI 1' ],
  //     [ 'COM SCI 32', 'COM SCI 33' ] ]);
  //   });

  // });
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


