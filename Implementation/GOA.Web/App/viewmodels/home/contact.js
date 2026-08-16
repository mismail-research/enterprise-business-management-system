define(['services/appsecurity', 'plugins/router', 'services/errorhandler'],
    function (appsecurity, router, errorhandler) {

        var name = ko.observable().extend({ required: true }),
            email = ko.observable().extend({ required: true, email: true }),
            subject = ko.observable(),
            message = ko.observable().extend({ required: true, minLength: 6 });

        var vm = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            infoMessage: ko.observable(),

            activate: function () {
                ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            },
            send: function () {
                var self = this;
                if (this.errors().length != 0) {
                    this.errors.showAllMessages();
                    return;
                }
                appsecurity.SendMessage({
                    name: self.name(),
                    email: self.email(),
                    subject: self.subject(),
                    message: self.message()
                }).done(function (data) {
                    self.infoMessage("Your message has been sent successfully.")
                    self.name("");
                    self.email("");
                    self.subject("");
                    self.message("");
                    self.errors.showAllMessages(false);
                });
            }
        }
        errorhandler.includeIn(vm);
        vm["errors"] = ko.validation.group(vm);

        return vm;

    });