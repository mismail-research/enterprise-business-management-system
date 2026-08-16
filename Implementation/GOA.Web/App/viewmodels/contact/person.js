
define(['services/unitofwork', 'services/errorhandler', 'services/logger', 'services/utils', 'plugins/router'], function (unitofwork, errorhandler, logger, utils, router) {

    var unitofwork = unitofwork.create();

    var vm = {

        person: ko.observable(),

        categories: ko.observableArray(),

        selectedArticle: ko.observable(),

        
        articles: ko.observableArray(),

        updating: ko.observable(false),

        preview: ko.observable(false),

        dateOfBirth: ko.observable(),
        displayAdvancedOptions : ko.observable(false),

        router: router,

        activate: function () {
            ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            var self = this;
            unitofwork.person.all().then(function(data){
            self.person(data)
            });
            
        },

        attached: function (view) {
            var self = this;
            
            Stashy.FocalPoint("#dashboard img").on();

            $("#dashboard #edited-article").on("hide.bs.modal", function () {
                if (self.selectedArticle().entityAspect.hasValidationErrors) {
                    var validationErrors = ko.validation.group(self.selectedArticle());
                    self.selectedArticle().errors.showAllMessages();
                }
                self.selectedArticle().unsavedChanges(self.selectedArticle().entityAspect.entityState.isAddedModifiedOrDeleted());
            });

            Stashy.ShowMeMore("#dashboard-articles .row", {
                linkClass: "btn btn-primary",
                linkText: "Show more articles",
                howMany: 4
            }).on();

            $("#dashboard #edited-article").on("shown.bs.modal", function () {
                $("#dashboard #edited-article .zen-mode").zenForm({ trigger: '#dashboard #edited-article .go-zen' });
                $("#dashboard #edited-article .zen-mode").keyup();
            });

            $("#dashboard #edited-article").on("zf-destroyed", function () {
                $("#dashboard #edited-article .zen-mode").trigger("change");
            });

            var articles = unitofwork.privatearticles.all()
                                .then(function (articles) {
                                    self.articles(articles);
                                }
            );

            var categories = unitofwork.categories.all()
                                .then(function (categories) {
                                    self.categories(categories)
                                }
            );

            Q.all([articles, categories]).fail(self.handleError);
        },
        compositionComplete: function () {
            $("#css3-animated-example").collapse({
                accordion: true,
                open: function () {
                    this.addClass("open");
                    this.css({ height: this.children().outerHeight() });
                },
                close: function () {
                    this.css({ height: "0px" });
                    this.removeClass("open");
                }
            });

            $('#uImage').picEdit({
                imageUpdated: function (img) {
                    alert('Image updated!');
                },
                formSubmitted: function (response) {
                    alert('Form submitted!');
                }
            });
           
            
            
        },
        save: function () {
            vm.router.navigate("contact/dashboard");
        },
        close: function () {
            vm.router.navigate("contact/dashboard");
        },

        newArticle: function () {
            var self = this,
                newarticle = unitofwork.privatearticles.create({ categoryId: this.categories()[0].categoryId() });
            this.articles.unshift(newarticle);
            this.selectedArticle(newarticle);
            bindTags(self.selectedArticle);
            this.updating(false);
            $('#edited-article').modal("show");
        },

        editArticle: function (article, parent) {
            var self = this;
            this.selectedArticle(article);
            bindTags(self.selectedArticle);
            this.updating(true);
            $('#edited-article').modal("show");
        },

        saveArticles: function () {
            var self = this;

            if (!unitofwork.hasChanges()) {
                return true;
            }

            unitofwork.commit()
                .then(function () {
                    logger.logSuccess("Article saved succesfully", null, null, true);
                    ko.utils.arrayForEach(self.articles(), function (article) {
                        article.unsavedChanges(article.entityAspect.entityState.isAddedModifiedOrDeleted());
                    });
                })
                .fail(this.handleError);

            return true;
        },

        deleteArticle: function (article, parent, closemodal) {
            var self = this;

            ko.utils.arrayForEach(article.tags(), function () {
                article.deleteTag(article.tags()[0]); // Because deleteTag decrement by one
            });

            unitofwork.privatearticles.delete(article);

            unitofwork.commit()
                .then(function () {
                    parent.articles.remove(article);
                    logger.logSuccess("Article removed succesfully", null, null, true);
                    if (closemodal) {
                        $('#edited-article').modal("hide");
                    }
                })
                .fail(self.handleError);
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
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datetimepickerOptions || {
                format: 'dd-M-yyyy',
                endDate: new Date(),
                weekStart: 1
            };
            $(element).datepicker(options);
            $('#DateOfBirth').datepicker({
                format: 'dd-M-yyyy',
                //daysOfWeekDisabled: [0, 6],
                weekStart: 1
            });

            //when a user changes the date, update the view model
            ko.utils.registerEventHandler(element, "changeDate", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(event.date);
                    $(this).datepicker('hide');
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).datepicker("setValue", value);
            $(element).datepicker("update", value);
            $(element).datepicker("setDate", value);
            //updatedatepicker(value);
        }
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

    function updatedatepicker(date) {
        //$('#First-Payment-date').datepicker("setStartDate", date);
        //$('#First-Payment-date').datepicker("setValue", date);
        //$('#First-Payment-date').datepicker("update", date);
        //$('#First-Payment-date').datepicker("setDate", date);
    };
    ko.bindingHandlers.datetimepicker = {
        init: function (element2, valueendate) {
            end_date = valueendate();
            var value = valueendate();
            endDateInput = element2;
            $(element2).datetimepicker({
                format: 'dd-M-yyyy hh:ii',
                todayBtn: true,
                autoclose: true,
                endDate: new Date(),
            });
            ko.utils.registerEventHandler(element2, "change", function () {
                value(element2.value);
            });

        },
        update: function (element2, valueendate, allBindingsAccessor, vm) {
            $(element2).datetimepicker({ format: 'dd-M-yyyy hh:ii' });
            var value = valueendate();


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