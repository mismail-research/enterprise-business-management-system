
define(['services/unitofwork', 'services/errorhandler', 'services/logger', 'services/utils', 'plugins/router'], function (unitofwork, errorhandler, logger, utils, router) {

    var unitofwork = unitofwork.create();
    var id = '';
    var vm = {

        products: ko.observableArray(),
        updating: ko.observable(false),
        preview: ko.observable(false),
        arrivalDate: ko.observable(),
        displayAdvancedOptions: ko.observable(false),
        logger: logger,
        router: router,


        activate: function () {
            unitofwork.products.allProducts().then(function (data) {
                vm.products(data);
            });
            ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            $("#dashboard-class").removeClass('active');
            $("#product-dashboard").addClass('active');
            $(".content").css('min-height', screen.height - 285);

        },
        attached: function (view) {

        },

        compositionComplete: function () {
            $(function () {
                $("#example1").dataTable({
                    "bSort": false,
                });

            });
            $("#dashboard-class").removeClass('active');
            $("#product-dashboard").addClass('active');
            $(".content").css('min-height', screen.height - 285);

        },
        addProduct: function () {
            vm.router.navigate("product/product");

        },
        editProduct: function () {
            var url = "product/product?id=" + this.productId() + "&mode=edit";
            vm.router.navigate(url);
        },
        viewProduct: function () {
            var url = "product/product?id=" + this.productId() + "&mode=view";
            vm.router.navigate(url);
        },
        marketexplorer: function () {
            vm.router.navigate("product/marketexplorer");
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
    errorhandler.includeIn(vm);

    ko.bindingHandlers.trimLengthText = 10;
    ko.bindingHandlers.trimText = {
        init: function (element, valueAccessor, allBindingsAccessor, vm) {
            var allBindings = allBindingsAccessor();
            var trimmedText = ko.computed(function () {
                var untrimmedText = ko.utils.unwrapObservable(valueAccessor());
                var maxLength = allBindings.maxLength || 10;
                var defaultMaxLength;
                if (maxLength == 'undefined' || maxLength == 0) {
                    defaultMaxLength = 10;
                }
                else {
                    defaultMaxLength = maxLength;
                }



                var minLength = 5;
                var MaxLength = ko.utils.unwrapObservable(allBindingsAccessor().trimTextLength) || defaultMaxLength;
                if (MaxLength < minLength) MaxLength = minLength;
                var text = "";
                if (untrimmedText != undefined) {
                    text = untrimmedText.length > MaxLength ? untrimmedText.substring(0, MaxLength - 1) + '...' : untrimmedText;
                }
                return text;
            });
            ko.applyBindingsToNode(element, {
                text: trimmedText
            }, vm);

            return {
                controlsDescendantBindings: true
            };
        },
        update: function (element, valueAccessor, allBindingsAccessor, vm) {
            var allBindings = allBindingsAccessor();
            var trimmedText = ko.computed(function () {
                var untrimmedText = ko.utils.unwrapObservable(valueAccessor());
                var maxLength = allBindings.maxLength || 10;
                var defaultMaxLength;
                if (maxLength == 'undefined' || maxLength == 0) {
                    defaultMaxLength = 10;
                }
                else {
                    defaultMaxLength = maxLength;
                }

                var minLength = 5;
                var MaxLength = ko.utils.unwrapObservable(allBindingsAccessor().trimTextLength) || defaultMaxLength;
                if (MaxLength < minLength) MaxLength = minLength;
                var text = "";
                if (untrimmedText != undefined) {
                    text = untrimmedText.length > MaxLength ? untrimmedText.substring(0, MaxLength - 1) + '...' : untrimmedText;
                }
                return text;
            });
            ko.applyBindingsToNode(element, {
                text: trimmedText
            }, vm);

            return {
                controlsDescendantBindings: true
            };
        }
    };

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