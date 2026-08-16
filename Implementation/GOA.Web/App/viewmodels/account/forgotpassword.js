/** 
  * @module Forgot your password
  * @requires appsecurity
  * @requires router
  * @requires errorHandler
*/

define(['services/appsecurity', 'plugins/router', 'services/errorhandler', 'services/logger'],
    function (appsecurity, router, errorhandler, logger) {

        var email = ko.observable().extend({ required: true, email: true });

        var viewmodel = {

            email: email,

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

            forgotPassword: function () {
                var self = this;
                if (this.errors().length != 0) {
                    this.errors.showAllMessages();
                    return;
                }

                appsecurity.forgotPassword({
                    eMail: self.email()
                }).done(function (data) {
                    logger.log("Take a look to your inbox for instructions about how to reset your password", data, null, true);
                    self.email("");
                    self.errors.showAllMessages(false);
                }).fail(self.handlevalidationerrors);
            }
        }

        errorhandler.includeIn(viewmodel);

        viewmodel["errors"] = ko.validation.group(viewmodel);

        return viewmodel;
    });