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
        $(function () {
            //Datemask dd/mm/yyyy
            $("#datemask").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/yyyy" });
            //Datemask2 mm/dd/yyyy
            $("#datemask2").inputmask("mm/dd/yyyy", { "placeholder": "mm/dd/yyyy" });
            //Money Euro
            $("[data-mask]").inputmask();

         
            
        });
    };
});