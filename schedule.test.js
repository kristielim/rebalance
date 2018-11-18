var schedule = require('./schedule');
var assert = require('assert');


describe('Schedule', function() {
  describe('#replaceConflictedClasses()', function() {
    it('should replace CS32 with EngComp3', function() {
      assert.equal([1,2,3].indexOf(4), -1);
      const oldSchedule = [['COM SCI 31', 'COM SCI 32'],['ENGCOMP 3']];
      const newSchedule = schedule.replaceConflictedClasses(oldSchedule);
      assert.deepEqual(newSchedule, [ [ 'COM SCI 31', 'ENGCOMP 3' ], [ 'COM SCI 32' ] ])
    });
  });
});