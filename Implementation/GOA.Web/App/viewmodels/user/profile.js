define(['viewmodels/header2', 'services/appsecurity', 'services/unitofwork', 'services/errorhandler', 'plugins/router', 'services/logger'], function (header2, appsecurity, unitofwork, errorhandler, router, logger) {

    var title = 'Profile';
    var unitofwork = unitofwork.create();


    var vm = {
        activate: activate,
        attached: attached,
        compositionComplete: compositionComplete,
        title: title,
        logger: logger,
        profile: ko.observable(),
        picData: ko.observable(),
        showPicModel: showPicModel,
        closePicModel: closePicModel,
        saveProfile: saveProfile,
        uploadPicture: uploadPicture,
        header2: header2,
        canDeactivate: canDeactivate,

    };
    ko.bindingHandlers.numeric = {
        init: function (element, valueAccessor) {
            $(element).on("keydown", function (event) {
                // Allow: backspace, delete, tab, escape, and enter
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                    // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
                    // Allow: . ,
                    (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                    // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                else {
                    // Ensure that it is a number and stop the keypress
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
    errorhandler.includeIn(vm);
    vm["errors"] = ko.validation.group(vm);

    return vm;

    //#region Internal Methods
    function activate() {
        //logger.log(title + ' View Activated', null, title, true);
        return true;
    };
    function attached() {
        unitofwork.profile.all().then(function (data) {
            vm.profile(data[0]);
        });
    };
    function compositionComplete() {

    };
    function saveProfile() {
        var self = this;
        if (vm.profile().firstName() == null || vm.profile().firstName() == '' || vm.profile().firstName() == undefined) {
            logger.logError("Please enter the First Name.", null, null, true);
            return;
        }
        if (vm.profile().lastName() == null || vm.profile().lastName() == '' || vm.profile().lastName() == undefined) {
            logger.logError("Please enter the Last Name.", null, null, true);
            return;
        }
        if (!unitofwork.hasChanges()) {
            return;
        }

        vm.profile().updatedDate(new Date());
        //vm.patient().nextVisitDate(vm.patient().prescription()[0].nextVisitDate());
        unitofwork.commit().then(function () {
            header2.getProfileData();
            logger.logSuccess("Profile saved successfully.", null, null, true);

        })
         .fail(this.handleError)
    };
    function canDeactivate() {

        return true;
    };

    function showPicModel() {
        $('#uploadPicture').picEdit({
            imageUpdated: function (img) {
                vm.picData(img);
            },
        });
        $('#upload-Picture').modal("show");
    };
    function closePicModel() {
        $('#upload-Picture').modal("hide");
    };
    function uploadPicture() {
        if (vm.picData() == undefined || vm.picData() == "" || vm.picData() == null) {
            logger.logError("Please select an image file.", null, null, true);
            return;
        }

        var data = new FormData();
        var img = vm.picData();
        var files = img.file;// $("#fileUpload").get(0).files;

        // Add the uploaded image content to the form data collection
        if (img.file != null) {
            data.append("UploadedImage", img.file);
        }
        else if (img.src != null) {
            data.append("ImageData", img.src);
        }

        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "/api/fileupload/uploadfile",
            contentType: false,
            processData: false,
            data: data
        });

        ajaxRequest.done(function (data) {
            vm.profile().pictureUrl(data);
            $('#upload-Picture').modal("hide");
        });
    };


    //#endregion
});