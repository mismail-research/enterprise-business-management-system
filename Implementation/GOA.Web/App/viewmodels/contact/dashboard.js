define(['plugins/router', 'services/appsecurity', 'services/errorhandler', 'services/utils', 'durandal/app'],
    function (router, appsecurity, errorhandler, utils,app) {     
    var title = 'Contact';
    var vm = {
        activate: activate,
        app: app,
        title: title,
        addPerson: AddPerson,
        addCompany: AddCompany,
        viewPeople: ViewPeople,
        router: router,
        delContact: DeleteContact
    };

    return vm;

    //#region Internal Methods
    function activate() {
        //logger.log(title + ' View Activated', null, title, true);
        return true;
    };
    function AddPerson() {
        vm.router.navigate("contact/person");
    };
    function AddCompany() {
        vm.router.navigate("contact/company");
    };
    function DeleteContact() {
        app.showMessage("The Contact will be removed permanently", "Are you sure?", ['Yes', 'No'])
    };
    function ViewPeople(opt) {
        //var opt = 'p';
        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');
        if (event.target.id=='download') {
            doc.save('test.pdf');
        }
        else if (event.target.id=='priview') {
            var string = doc.output('datauristring');
            $('.preview-pane').attr('src', string);
            $('#preview-pane').modal("show");
        }
       
    };
    //#endregion
});