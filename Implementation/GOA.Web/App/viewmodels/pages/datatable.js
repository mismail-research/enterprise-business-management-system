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
            $("#example1").dataTable();
            $('#example2').dataTable({
                "bPaginate": true,
                "bLengthChange": false,
                "bFilter": false,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
            });
        });
    };
});