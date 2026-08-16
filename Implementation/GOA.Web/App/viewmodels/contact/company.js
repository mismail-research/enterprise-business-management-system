define(['plugins/router', 'services/appsecurity', 'services/errorhandler', 'services/utils'],
    function (router, appsecurity, errorhandler, utils) {
        var title = 'Contact';
        var vm = {
            activate: activate,
            title: title,
            addPerson: AddPerson,
            addCompany: AddCompany,
            router: router
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
        //#endregion
    });