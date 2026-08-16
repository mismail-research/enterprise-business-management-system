/** 
 * @module Route table
 */
define(function () {

    var routes = {
        // Breeze Routes. Relative to entitymanagerprovider service name
        lookupUrl: "GOA/lookups",
        saveChangesUrl: "GOA/savechanges",
        publicArticlesUrl: "GOA/publicarticles",
        privateArticlesUrl: "GOA/privatearticles",
        categoriesUrl: "GOA/categories",
        contactUrl: "Contact/SaveChanges",
        profilesUrl: "goa/profiles",
        profileUrl: "goa/getprofile",
        //Contact Urls
        contactUrl: "contact/getcontact",
        //Authentication Routes
        addExternalLoginUrl: "/api/account/addexternallogin",
        changePasswordUrl: "/api/account/changepassword",
        loginUrl: "/token",
        logoutUrl: "/api/account/logout",
        sendMessageUrl: "/api/account/sendMessage",
        registerUrl: "/api/account/register",
        registerExternalUrl: "/api/account/registerexternal",
        removeLoginUrl: "/api/account/removelogin",
        setPasswordUrl: "/api/account/setpassword",
        siteUrl: "/",
        userInfoUrl: "/api/account/userinfo",
        getUsersUrl: "/api/account/getusers",
        forgotPassword: "/api/account/forgotpassword",
        resendMailRoute: "/api/account/resendconfirmationemail",
        resetPassword: "/api/account/resetpassword",
        deleteaccount: "/api/account/deleteaccount",
        //Products Routes
        ProductsUrl: "Products/GetAllProducts",
        ProductModelUrl: "Products/GetProductsModel"
    };

    return routes;

});