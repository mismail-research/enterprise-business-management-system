define(['services/logger'], function (logger) {
    var title = '';
    var vm = {
        activate: activate,
        attached: attached,
        compositionComplete: compositionComplete,
        title: title
    };

    return vm;

    //#region Internal Methods
    function activate() {
        //logger.log(title + ' View Activated', null, title, true);
        return true;
    };
    function attached() {

    };
    function compositionComplete() {
       
    };
});