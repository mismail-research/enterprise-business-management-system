define(['plugins/router', 'services/appsecurity', 'services/errorhandler', 'services/entitymanagerprovider', 'model/modelBuilder'],
    function (router, appsecurity, errorhandler, entitymanagerprovider, modelBuilder) {

    entitymanagerprovider.modelBuilder = modelBuilder.extendMetadata;

    var viewmodel = {

        attached : function() {
            $(document).find("footer").show();
        },

        activate: function () {
            var self = this;            

            return entitymanagerprovider
                    .prepare()
                    .then(function() {
                       
                        //configure routing
                        router.makeRelative({ moduleId: 'viewmodels' });

                        // If the route has the authorize flag and the user is not logged in => navigate to login view      
                        // If the route has the confirmed flag and the user's email is not confirmed => navigate to login view and display confirmation warning
                        router.guardRoute = function (instance, instruction) {
                            if (sessionStorage["redirectTo"]) {
                                var redirectTo = sessionStorage["redirectTo"]
                                sessionStorage.removeItem("redirectTo");
                                return redirectTo;
                            }

                            if (instruction.config.authorize) {
                                if (typeof (appsecurity.userInfo()) !== 'undefined') {
                                    if (appsecurity.isUserInRole(instruction.config.authorize)) {
                                        if (instruction.config.confirmed) {
                                            if (appsecurity.userInfo().isEmailConfirmed()) {
                                                return true;
                                            } else {
                                                appsecurity.showConfirmationWarning(true);
                                                return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                            }
                                        } else {
                                            return true;
                                        }
                                    } else {
                                        return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                    }
                                } else {
                                    return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                }
                            } else {
                                return true;
                            }
                        };
						
                        // Config Routes
                        // Routes with authorize flag will be forbidden and will redirect to login page
                        // As this is javascript and is controlled by the user and his browser, the flag is only a UI guidance. You should always check again on 
                        // server in order to ensure the resources travelling back on the wire are really allowed

                        return router.map([
                            // Nav urls
                            { route: ['', 'home/index'], moduleId: 'home/index', title: 'Home', nav: true, hash: "#home/index", authorize: ["User"]},
                            { route: 'home/articles', moduleId: 'home/articles', title: 'Articles', nav: true, hash: "#home/articles", authorize: ["User"], confirmed: true },
                            { route: 'home/help', moduleId: 'home/help', title: 'Help', nav: true, hash: "#home/help", authorize: ["User"], confirmed: true },
                            { route: 'home/about', moduleId: 'home/about', title: 'About', nav: true, hash: "#home/about", authorize: ["User"], confirmed: true },
                            { route: 'home/contact', moduleId: 'home/contact', title: 'Contact Us', nav: true, hash: "#home/contact", authorize: ["User"], confirmed: true },
                            { route: 'notfound', moduleId: 'notfound', title: 'Not found', nav: false },
                                
                            // Admin panel url
                            { route: 'admin/panel',                           moduleId: 'admin/panel',                       title: 'Admin Panel',                 nav: false, hash : "#admin/panel",  authorize: ["Administrator"] } ,

                            // Account Controller urls
                            { route: 'account/login',                         moduleId: 'account/login',                     title: 'Login',                       nav: false, hash : "#account/login" },
                            { route: 'account/externalloginconfirmation',     moduleId: 'account/externalloginconfirmation', title: 'External login confirmation', nav: false, hash : "#account/externalloginconfirmation" },
                            { route: 'account/externalloginfailure',          moduleId: 'account/externalloginfailure',      title: 'External login failure',      nav: false, hash : "#account/externalloginfailure" },
                            { route: 'account/register',                      moduleId: 'account/register',                  title: 'Register',                    nav: false, hash : "#account/register" },
                            { route: 'account/manage',                        moduleId: 'account/manage',                    title: 'Manage account',              nav: false, hash:  "#account/manage", authorize: ["User", "Administrator"] },
                            { route: 'account/registrationcomplete',          moduleId: 'account/registrationcomplete',      title: 'Registration complete',       nav: false, hash:  "#account/registrationcomplete" },
                            { route: 'account/forgotpassword',                moduleId: 'account/forgotpassword',            title: 'Forgot password',             nav: false, hash:  "#account/forgotpassword" },
                            { route: 'account/resetpassword',                 moduleId: 'account/resetpassword',             title: 'Reset password',              nav: false, hash:  "#account/resetpassword" },

                            // User articles urls
                            { route: 'user/dashboard',                        moduleId: 'user/dashboard',                    title: 'Dashboard',                   nav: false, hash : "#user/dashboard",  authorize: ["User"], confirmed : true  },
                            { route: ':createdby/:categorycode/:articlecode', moduleId: 'user/article', title: 'Article', nav: false, authorize: ["User"], confirmed: true },
                            { route: 'user/editProfile', moduleId: 'user/editProfile', title: 'Edit Profile', nav: false, hash: "#user/editProfile", authorize: ["User"], confirmed: true },
                             { route: 'user/profile', moduleId: 'user/profile', title: 'Update Profile', nav: false, hash: "#user/profile", authorize: ["User"], confirmed: true },
                            //Contact urls
                            { route: 'contact/dashboard', moduleId: 'contact/dashboard', title: 'Contact', nav: false, hash: "#contact/dashboard", authorize: ["User"], confirmed: true },
                            { route: 'contact/person', moduleId: 'contact/person', title: 'Person', nav: false, hash: "#contact/person", authorize: ["User"], confirmed: true },
                            { route: 'contact/company', moduleId: 'contact/company', title: 'Company', nav: false, hash: "#contact/company", authorize: ["User"], confirmed: true },

                            // Theme sample pages
                            { route: 'pages/index1', moduleId: 'pages/index1', title: 'Dashboard 01', nav: true, hash: "#pages/index1", authorize: ["User"], confirmed: true },
                            { route: 'pages/index2', moduleId: 'pages/index2', title: 'Dashboard 02', nav: true, hash: "#pages/index2", authorize: ["User"], confirmed: true },
                            { route: 'pages/widgets', moduleId: 'pages/widgets', title: 'Widgets', nav: true, hash: "#pages/widgets", authorize: ["User"], confirmed: true },
                            { route: 'pages/charts', moduleId: 'pages/charts', title: 'Charts', nav: true, hash: "#pages/charts", authorize: ["User"], confirmed: true },
                            { route: 'pages/morrischart', moduleId: 'pages/morrischart', title: 'Morris Charts', nav: true, hash: "#pages/morrischart", authorize: ["User"], confirmed: true },
                            { route: 'pages/flotchart', moduleId: 'pages/flotchart', title: 'Flot Charts', nav: true, hash: "#pages/flotchart", authorize: ["User"], confirmed: true },
                            { route: 'pages/inlinechart', moduleId: 'pages/inlinechart', title: 'Inline Charts', nav: true, hash: "#pages/inlinechart", authorize: ["User"], confirmed: true },

                            { route: 'pages/uigeneral', moduleId: 'pages/uigeneral', title: 'UI General', nav: true, hash: "#pages/uigeneral", authorize: ["User"], confirmed: true },
                            { route: 'pages/uiicon', moduleId: 'pages/uiicon', title: 'UI Icons', nav: true, hash: "#pages/uiicon", authorize: ["User"], confirmed: true },
                            { route: 'pages/uibutton', moduleId: 'pages/uibutton', title: 'UI Buttons', nav: true, hash: "#pages/uibutton", authorize: ["User"], confirmed: true },
                            { route: 'pages/uislider', moduleId: 'pages/uislider', title: 'UI Sliders', nav: true, hash: "#pages/slider", authorize: ["User"], confirmed: true },
                            { route: 'pages/uitimeline', moduleId: 'pages/uitimeline', title: 'UI Timeline', nav: true, hash: "#pages/uitimeline", authorize: ["User"], confirmed: true },
                            { route: 'pages/uimodal', moduleId: 'pages/uimodal', title: 'UI Modals', nav: true, hash: "#pages/uimodal", authorize: ["User"], confirmed: true },

                            { route: 'pages/formgeneral', moduleId: 'pages/formgeneral', title: 'Form General Elements', nav: true, hash: "#pages/formgeneral", authorize: ["User"], confirmed: true },
                            { route: 'pages/formadvance', moduleId: 'pages/formadvance', title: 'Form Advanced Elements', nav: true, hash: "#pages/formadvance", authorize: ["User"], confirmed: true },
                            { route: 'pages/formeditor', moduleId: 'pages/formeditor', title: 'Editor Elements', nav: true, hash: "#pages/formeditor", authorize: ["User"], confirmed: true },

                            { route: 'pages/simpletable', moduleId: 'pages/simpletable', title: 'Simple Tables', nav: true, hash: "#pages/simpletable", authorize: ["User"], confirmed: true },
                            { route: 'pages/datatable', moduleId: 'pages/datatable', title: 'Data Table', nav: true, hash: "#pages/datatable", authorize: ["User"], confirmed: true },
                            { route: 'pages/mailbox', moduleId: 'pages/mailbox', title: 'MailBox', nav: true, hash: "#pages/mailbox", authorize: ["User"], confirmed: true },
                            { route: 'pages/compose', moduleId: 'pages/compose', title: 'Compose', nav: true, hash: "#pages/compose", authorize: ["User"], confirmed: true },
                            { route: 'pages/read', moduleId: 'pages/read', title: 'Read Message', nav: true, hash: "#pages/read", authorize: ["User"], confirmed: true },

                             { route: 'pages/invoice', moduleId: 'pages/invoice', title: 'Invoice', nav: true, hash: "#pages/invoice", authorize: ["User"], confirmed: true },
                             { route: 'pages/login', moduleId: 'pages/login', title: 'Login Page', nav: true, hash: "#pages/login", authorize: ["User"], confirmed: true },
                             { route: 'pages/register', moduleId: 'pages/register', title: 'Register', nav: true, hash: "#pages/register", authorize: ["User"], confirmed: true },
                             { route: 'pages/lockscreen', moduleId: 'pages/lockscreen', title: 'Lock Screen', nav: true, hash: "#pages/lockscreen", authorize: ["User"], confirmed: true },
                             { route: 'pages/error404', moduleId: 'pages/error404', title: 'Error 404', nav: true, hash: "#pages/error404", authorize: ["User"], confirmed: true },
                             { route: 'pages/error500', moduleId: 'pages/error500', title: 'Error 500', nav: true, hash: "#pages/error500", authorize: ["User"], confirmed: true },
                             { route: 'pages/blankpage', moduleId: 'pages/blankpage', title: 'Blank Page', nav: true, hash: "#pages/blankpage", authorize: ["User"], confirmed: true },
                             { route: 'pages/notifications', moduleId: 'pages/notifications', title: 'All Notifications', nav: true, hash: "#pages/notifications", authorize: ["User"], confirmed: true },
                             { route: 'pages/tasks', moduleId: 'pages/tasks', title: 'All Tasks', nav: true, hash: "#pages/tasks", authorize: ["User"], confirmed: true },
                             { route: 'product/product', moduleId: 'product/product', title: 'Product', nav: true, hash: "#pages/products", authorize: ["User"], confirmed: true },
                             { route: 'product/dashboard', moduleId: 'product/dashboard', title: 'Products', nav: true, hash: "#pages/dashboard", authorize: ["User"], confirmed: true },
                             { route: 'product/marketexplorer', moduleId: 'product/marketexplorer', title: 'Market Explorer', nav: true, hash: "#pages/marketexplorer", authorize: ["User"], confirmed: true },



                        ])
                        .buildNavigationModel()
                        .mapUnknownRoutes("notfound","notfound")
                        .activate({ pushState : true });
                    })
                    .fail(self.handlevalidationerrors);
        }
    };

    errorhandler.includeIn(viewmodel);

    return viewmodel;
});
