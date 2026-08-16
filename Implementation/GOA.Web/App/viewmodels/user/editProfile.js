define(['services/unitofwork', 'services/logger','services/errorhandler'], function (unitofwork, logger, errorhandler) {

    var unitofwork = unitofwork.create();
    var vm = {
        profile: ko.observable(),
        activate: function () {

        },
        attached: function () {
            var self = this;
            unitofwork.profile.all().then(function (profile) {
                self.profile(profile[0])
            });
        },
        save: function () {
            if (!unitofwork.hasChanges())
            {
                return;
            }
           unitofwork.commit().then(function () {
               logger.logSuccess("Profile saved successfully.", null, null, true);
           })
            .fail(this.handleError)
        },
        rollBack: function () {
            unitofwork.rollback();
        },
    };
    errorhandler.includeIn(vm);
    return vm;

});