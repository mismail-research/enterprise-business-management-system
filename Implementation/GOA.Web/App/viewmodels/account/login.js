/** 
 * @module Login
 * @requires appsecurity
 * @requires router
 * @requires errorHandler
 */

define(['viewmodels/header2', 'services/appsecurity', 'plugins/router', 'services/errorhandler', 'services/utils', 'services/logger'],
    function (header2, appsecurity, router, errorhandler, utils, logger) {

        var username = ko.observable().extend({ required: true }),
            password = ko.observable().extend({ required: true, minLength: 6 }),
            rememberMe = ko.observable(false),
            returnUrl = ko.observable(null),
            isAuthenticated = ko.observable(false);

        function ExternalLoginProviderViewModel(data, returnUrl) {
            var self = this;

            self.name = ko.observable(data.name);

            self.login = function () {
                sessionStorage["state"] = data.state;
                sessionStorage["loginUrl"] = data.url;
                $("body").addClass('sidebar-mini');
                if (returnUrl) {
                    sessionStorage["redirectTo"] = returnUrl;
                } else {
                    sessionStorage["redirectTo"] = "/home/index";
                }

                // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage temporarily
                // to localStorage to work around this problem.
                appsecurity.archiveSessionStorageToLocalStorage();

                window.location = data.url;
            };

            self.socialIcon = function (data) {
                var icon = "";
                switch (data.name().toLowerCase()) {
                    case "facebook":
                        icon = "fa fa-facebook-square";
                        break;
                    case "twitter":
                        icon = "fa fa-twitter-square";
                        break;
                    case "google":
                        icon = "fa fa-google-plus-square";
                        break;
                    case "microsoft":
                        icon = "fa fa-envelope";
                        break;
                    default:
                        icon = "fa fa-check-square";
                }
                return icon;
            }
        }

        var viewmodel = {

            convertRouteToHash: router.convertRouteToHash,
            username: username,
            password: password,
            rememberMe: rememberMe,
            returnUrl: returnUrl,
            appsecurity: appsecurity,
            header2: header2,
            externalLoginProviders: ko.observableArray(),
            activate: function (splat) {
                var self = this;
                //self.logout();
                $("body").removeClass('sidebar-mini');
                $("body").addClass('sidebar-collapse');
                ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
                $(".content").css('min-height', screen.height - 170);
                if (splat && splat.returnUrl) {
                    self.returnUrl(splat.returnUrl);
                }

                return appsecurity.getExternalLogins(appsecurity.returnUrl, true)
                    .then(function (data) {
                        if (typeof (data) === "object") {
                            self.externalLoginProviders.removeAll();
                            for (var i = 0; i < data.length; i++) {
                                self.externalLoginProviders.push(new ExternalLoginProviderViewModel(data[i], self.returnUrl() ? self.returnUrl() : null));
                            }
                        }
                    }).fail(self.handleauthenticationerrors);
            },

            canDeactivate: function () {9
                $("body").addClass('sidebar-mini');
                $("body").removeClass('sidebar-collapse');
                return true;
            },
            compositionComplete: function () {
                $(".content").css('min-height', screen.height - 170);
                var self = this;
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue',
                    increaseArea: '20%' // optional
                });
                $('input').on('ifChecked', function (event) {
                    self.rememberMe(true);
                });
                $('input').on('ifUnchecked', function (event) {
                    self.rememberMe(false);
                });
            },

            login: function () {
                var self = this;
                
                if (this.errors().length != 0) {
                    this.errors.showAllMessages();
                    return;
                }

                appsecurity.login({
                    grant_type: "password",
                    username: self.username(),
                    password: self.password()
                }).done(function (data) {
                    if (data.userName && data.access_token) {
                        appsecurity.setAuthInfo(data.userName, data.roles, data.emailConfirmed == "true" ? true : false, data.access_token, self.rememberMe());

                        // get the current default Breeze AJAX adapter
                        var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
                        // set fixed headers
                        ajaxAdapter.defaultSettings = {
                            headers: appsecurity.getSecurityHeaders()
                        };

                        self.username("");
                        self.password("");
                        self.rememberMe(false);

                        self.errors.showAllMessages(false);

                        // Avoid redirect attacks
                        if (self.returnUrl() && utils.isExternal(self.returnUrl())) {
                            logger.logError("Can´t redirect to external urls", self.returnUrl(), null, true);
                            return false;
                        }

                        if (self.returnUrl()) {
                            header2.getProfileData();
                            router.navigate(self.returnUrl());
                            //window.location = self.returnUrl();
                        } else {
                            header2.getProfileData();
                            router.navigate("/home/index");
                            // window.location = "/home/index";
                        }
                    }
                }).fail(self.handleauthenticationerrors);
            },

            logout: function () {
                appsecurity.logout()
                .done(function () {
                    appsecurity.clearAuthInfo();
                    if (router.activeInstruction().config.authorize) {
                        window.location = "/account/login";
                    } else {
                        window.location = "/home/index";
                    }
                })
                .fail(self.handlevalidationerrors);
            }
        }

        errorhandler.includeIn(viewmodel);

        viewmodel["errors"] = ko.validation.group(viewmodel);

        return viewmodel;


    });