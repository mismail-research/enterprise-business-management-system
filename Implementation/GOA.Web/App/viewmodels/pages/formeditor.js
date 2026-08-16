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
            // Replace the <textarea id="editor1"> with a CKEditor
            // instance, using default configuration.
            //CKEDITOR.replace('editor1');
            //bootstrap WYSIHTML5 - text editor
            $(".textarea").wysihtml5();
        });
    };
});