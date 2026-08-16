
define(['services/unitofwork', 'services/errorhandler', 'services/logger', 'services/utils', 'plugins/router', 'services/appsecurity'], function (unitofwork, errorhandler, logger, utils, router, appsecurity) {

    var unitofwork = unitofwork.create();
    var id = '';
    var dateElement, dateValue;
    var vm = {

        product: ko.observable(),
        mode: ko.observable(),
        logger: logger,
        router: router,

        activate: function (queryString) {
            vm.mode("");
            if (queryString != undefined) {
                vm.mode(queryString.mode);
                id = queryString.id;
                unitofwork.product.find(breeze.Predicate.create("productId", "==", id)).then(function (data) {
                    vm.product(data[0]);
                });
            }
            else {
                unitofwork.rollback();
                var product = unitofwork.product.create();
                var buyers = unitofwork.buyers.create();
                var address = unitofwork.address.create();
                buyers.address.push(address);
                product.buyers.push(buyers);
                vm.product(product);
            }
            ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            $(".content").css('min-height', screen.height - 285);
            
            return true;
        },

        attached: function (view) {

        },
        compositionComplete: function () {
            $(function () {
                $("#tableBuyers").dataTable({
                    "bPaginate": true,
                    "bLengthChange": false,
                    "bFilter": false,
                    "bSort": false,
                    "bInfo": true,
                    "bAutoWidth": false
                });

            });
            $("#dashboard-class").removeClass('active');
            $("#product-dashboard").addClass('active');
            $(".content").css('min-height', screen.height - 285);
        },
        save: function () {
            var date = utils.getCurrentDate();
            var self = this;
            self.product().commodityCode.extend({ required: true, maxLength: 25 });
            self.product().productDescription.extend({ required: true, maxLength: 150 });
            self.product().productNo.extend({ required: true, maxLength: 30 });
            self.product().productName.extend({ required: true, maxLength: 30 });
            self.product().buyers()[0].buyerName.extend({ required: true, maxLength: 30 });
            self.product().buyers()[0].buyerPhoneNumber.extend({ maxLength: 25, digit: true });
            self.product().buyers()[0].buyerEmail.extend({ required: true, email: true, maxLength: 50 });
            self.product().buyers()[0].address()[0].addressLines.extend({ required: true, maxLength: 250 });
            self.product().buyers()[0].address()[0].city.extend({ required: true, maxLength: 30 });
            self.product().buyers()[0].address()[0].zipCode.extend({ required: true, maxLength: 30 });
            self.product().buyers()[0].address()[0].country.extend({ required: true,  maxLength: 30});

            self.validationErrors = ko.validation.group([self.product().commodityCode, self.product().productDescription,  self.product().productName, self.product().productNo, self.product().buyers()[0].address()[0].addressLines, self.product().buyers()[0].address()[0].country, self.product().buyers()[0].address()[0].zipCode, self.product().buyers()[0].address()[0].city, self.product().buyers()[0].buyerName, self.product().buyers()[0].buyerPhoneNumber, self.product().buyers()[0].buyerEmail]);

            if (self.validationErrors().length > 0) {
                logger.logError("Please fill all field", null, null, true);
                self.validationErrors.showAllMessages();
                return;
            }
            if(vm.mode() == "edit")
            {
                vm.product().updatedDate(date);
            }
                
            unitofwork.commit().then(function () {
                logger.logSuccess("Product saved successfully.", null, null, true);
                vm.router.navigate("product/dashboard");

            }).fail(this.handleError).fail(self.handlevalidationerrors)

        },
        close: function () {
            vm.router.navigate("product/dashboard");
        },
        editProduct: function () {
            
        },
        viewProduct: function () {
        },
        closeModal: function (article) {
            $('#edited-article').modal("hide");
        },

        changePreview: function (article, parent) {
            parent.preview() ? parent.preview(false) : parent.preview(true)
        },

        convertMarkdown: function (article) {
            article.html(marked(article.markdown()));
        },

        utils: utils
    };

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });
    ko.validation.init({
        messagesOnModified: false
    });
    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor) {
            $(element).select2(valueAccessor());

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element) {
            $(element).trigger('change');
        }
    };

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            // Initially set the element to be instantly visible/hidden depending on the value
            var value = valueAccessor();
            $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
        },
        update: function (element, valueAccessor) {
            // Whenever the value subsequently changes, slowly fade the element in or out
            var value = valueAccessor();
            ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor) {
            $(element).datepicker({
                format: 'dd-M-yyyy',
                todayBtn: true,
                autoclose: true,
            }).datepicker("setDate", "0");
            if (vm.mode() == 'view' || vm.mode() == 'edit') {
                $(element).datepicker("setDate", vm.product().arrivalDate());
            }
            var value = valueAccessor();
            dateElement = element;
            dateValue = valueAccessor();
            ko.utils.registerEventHandler(element, "change", function () {
                value(element.value);
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, vm) {
            $(element).datepicker({ format: 'dd-M-yyyy' });
            var value = valueAccessor();

        }

    };

    errorhandler.includeIn(vm);
    return vm;

    function findTag(tagname, tags) {
        for (var i = 0; i < tags().length; i++) {
            if (tagname == tags()[i].name()) {
                return tags()[i];
            }
        }
    }

    function bindTags(article) {
        $("#tags").tagsInput({
            "onAddTag": function (tag) {
                article().addTag(tag);
            },
            "onRemoveTag": function (tag) {
                article().deleteTag(findTag(tag, article().tags));
            },
            "defaultText": "New tag"
        });
    }

});