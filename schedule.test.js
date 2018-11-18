var schedule = require('./schedule');
var assert = require('assert');


describe('Schedule', function () {
  describe('#replaceConflictedClasses()', function () {
    it('should replace CS32 with EngComp3', function () {
      const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3']];
      const newSchedule = schedule.replaceConflictedClasses(oldSchedule);
      assert.deepEqual(newSchedule, [['COM SCI 31', 'ENGCOMP 3'], ['COM SCI 32']])
    });
    it('should replace the conflicted class twice'), function () {
      const oldSchedule = [['COM SCI 31', 'COM SCI 32'], ['ENGCOMP 3', 'COM SCI 33']];
    }
  });
});