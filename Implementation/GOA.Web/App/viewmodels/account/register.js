/** 
  * @module Manage registering users
  * @requires appsecurity
  * @requires router
  * @requires errorHandler
*/

define(['services/appsecurity', 'plugins/router', 'services/errorhandler'],
    function (appsecurity, router, errorhandler) {

        var username = ko.observable().extend({ required: true }),
            email = ko.observable().extend({ required: true, email: true }),
            password = ko.observable().extend({ required: true, minLength: 6 }),
            confirmpassword = ko.observable().extend({ required: true, minLength: 6, equal: password });

        var viewmodel = {

            username: username,

            email: email,

            password: password,

            agreeTerms: ko.observable(false),

            confirmpassword: confirmpassword,

            activate: function () {
                $("body").removeClass('sidebar-mini');
                $("body").addClass('sidebar-collapse');
                ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            },
            canDeactivate: function () {
                $("body").addClass('sidebar-mini');
                $("body").removeClass('sidebar-collapse');
                return true;
            },
            compositionComplete: function () {
                var self = this;
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue',
                    increaseArea: '20%' // optional
                });
                $('input').on('ifChecked', function (event) {
                    self.agreeTerms(true);
                });
                $('input').on('ifUnchecked', function (event) {
                    self.agreeTerms(false);
                });
            },
            showTermsModel: function () {
                $('#termsModel').modal("show");
            },
            closeTermsModel: function () {
                $('#termsModel').modal("hide");
            },
            enableRegister: function(){
                alert();
            },
            register: function () {
                var self = this;
                if (this.errors().length != 0) {
                    this.errors.showAllMessages();
                    return;
                }
                appsecurity.register({
                    userName: self.username(),
                    eMail: self.email(),
                    password: self.password(),
                    confirmPassword: self.confirmpassword()
                }).done(function (data) {
                    appsecurity.login({
                        grant_type: "password",
                        username: self.username(),
                        password: self.password()
                    }).done(function (data) {
                        if (data.userName && data.access_token) {
                            appsecurity.setAuthInfo(
								data.userName,
								data.roles,
                                false,
								data.access_token,
								self.rememberMe);
                            self.username("");
                            self.email("");
                            self.password("");
                            self.confirmpassword("");
                            self.errors.showAllMessages(false);
                        }
                        //router.navigate("account/manage");
                        window.location = "/home/index";
                    }).fail(self.handleauthenticationerrors);
                }).fail(self.handlevalidationerrors);
            }
        }

        errorhandler.includeIn(viewmodel);

        viewmodel["errors"] = ko.validation.group(viewmodel);

        return viewmodel;
    });