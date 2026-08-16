/** 
 * @module This module has the responsability of creating breeze entities
 *         Add here all your initializers, constructors, ...etc
 * @requires appsecurity
 * @requires utils
 */
define(['services/appsecurity', 'services/utils'],
    function (appsecurity, utils) {
        var foreignKeyInvalidValue = 0;

        var self = {
            extendMetadata: extendMetadata
        };

        return self;

        /**
         * Extend entities
         * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
         */
        function extendMetadata(metadataStore) {
            extendProduct(metadataStore);
            extendBuyer(metadataStore);
            extendAddress(metadataStore);
        };
        /**
         * Extend Products
         * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
         */
        function extendProduct(metadataStore) {
            var productCtor = function () {
                this.productId = ko.observable(breeze.core.getUuid());
                var date = utils.getCurrentDate();
                this.arrivalDate = ko.observable(date);
                this.createdDate = ko.observable(date);
                this.updatedDate = ko.observable(date);
                this.createdBy = ko.observable(typeof (appsecurity.userInfo()) !== 'undefined' ? appsecurity.userInfo().name() : "");
                this.updatedBy = ko.observable(typeof (appsecurity.userInfo()) !== 'undefined' ? appsecurity.userInfo().name() : "");

            };

            productCtor.prototype.throwIfNotOwnerOf = function (obj) {
                if (!obj.productId || obj.productId() !== this.productId()) {
                    throw new Error('Object is not associated with current Product');
                }
            };

            var productInitializer = function (product) {
                addValidationRules(product);
                addhasValidationErrorsProperty(product);

                //  person.formattedCreatedDate = ko.computed(function () {
                //        return moment(person.dtCreated()).format('MMM DD YYYY');
                //    });
            };

            metadataStore.registerEntityTypeCtor('Products', productCtor, productInitializer);


        };
        /**
       * Extend Buyers
       * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
       */
        function extendBuyer(metadataStore) {
            var buyerCtor = function () {
                this.buyerId = ko.observable(breeze.core.getUuid());
            };

            buyerCtor.prototype.throwIfNotOwnerOf = function (obj) {
                if (!obj.buyerId || obj.buyerId() !== this.buyerId()) {
                    throw new Error('Object is not associated with current Buyer');
                }
            };

            var buyerInitializer = function (buyer) {
                addValidationRules(buyer);
                addhasValidationErrorsProperty(buyer);
            };

            metadataStore.registerEntityTypeCtor('Buyers', buyerCtor, buyerInitializer);
        };
        function extendAddress(metadataStore) {
            var addressCtor = function () {
                this.id = ko.observable(breeze.core.getUuid());
            };
            addressCtor.prototype.throwIfNotOwnerOf = function (obj) {
                if (!obj.id || obj.id() !== this.id()) {
                    throw new Error('Object is not associated with current Address');
                }
            };

            var addressInitializer = function (address) {
                addValidationRules(address);
                addhasValidationErrorsProperty(address);
            };

            metadataStore.registerEntityTypeCtor('Addresses', addressCtor, addressInitializer);
        };
        /**
         * Extend articles
         * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
         */
        function extendArticle(metadataStore) {
            var articleCtor = function () {
                this.articleId = ko.observable(breeze.core.getUuid());
                this.imageUrl = ko.observable("/Content/icons/no_photo.png");
                this.createdBy = ko.observable(typeof (appsecurity.userInfo()) !== 'undefined' ? appsecurity.userInfo().userName : "");
                this.updatedBy = ko.observable(typeof (appsecurity.userInfo()) !== 'undefined' ? appsecurity.userInfo().userName : "");
                this.isPublished = ko.observable(false);
                var date = utils.getCurrentDate();
                this.createdDate = ko.observable(date);
                this.updatedDate = ko.observable(date);
            };

            articleCtor.prototype.addTag = function (tagname) {
                var tag = this.entityAspect.entityManager.createEntity('Tag', { name: tagname, articleId: this.articleId() });
                this.tags.push(tag);
                return tag;
            };

            articleCtor.prototype.deleteTag = function (tag) {
                ensureEntityType(tag, 'Tag');
                this.throwIfNotOwnerOf(tag);

                tag.entityAspect.setDeleted();
            };

            articleCtor.prototype.throwIfNotOwnerOf = function (obj) {
                if (!obj.articleId || obj.articleId() !== this.articleId()) {
                    throw new Error('Object is not associated with current Article');
                }
            };

            var articleInitializer = function (article) {
                addValidationRules(article);
                addhasValidationErrorsProperty(article);
                article.splitTags = ko.computed(function () {
                    var computedtags = [];
                    ko.utils.arrayForEach(article.tags(), function (tag) {
                        computedtags.push(tag.name());
                    });
                    return computedtags.join(",");
                });
                article.formattedCreatedDate = ko.computed(function () {
                    return moment(article.createdDate()).format('MMM DD YYYY');
                });
                article.unsavedChanges = ko.observable(article.entityAspect.entityState.isAddedModifiedOrDeleted());
            };

            metadataStore.registerEntityTypeCtor('Article', articleCtor, articleInitializer);
        };

        /**
         * Extend categories
         * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
         */
        function extendCategory(metadataStore) {
            var categoryCtor = function () {
                this.categoryId = ko.observable(breeze.core.getUuid());
            };
            metadataStore.registerEntityTypeCtor('Category', categoryCtor);
        };

        /**
         * Extend tags
         * param {BreezeManagerMetadataStore} metadataStore - The breeze metadata store
         */
        function extendTag(metadataStore) {
            var tagCtor = function () {
                this.tagId = ko.observable(breeze.core.getUuid());
            };
            metadataStore.registerEntityTypeCtor('Tag', tagCtor);
        };

        function extendProfile(metadataStore) {
            var profileCtor = function () {
                this.firstName = "First Name";
                this.lastName = "Last Name";
                this.title = "Title";
            };

            var profileInitializer = function (profile) {
                addValidationRules(profile);
                addhasValidationErrorsProperty(profile);
                profile.formattedCreatedDate = ko.computed(function () {
                    return moment(profile.createdDate()).format('MMMM YYYY');
                });
                profile.formattedUpdatedDate = ko.computed(function () {
                    return moment(profile.updatedDate()).format('MMMM YYYY');
                });

            };

            metadataStore.registerEntityTypeCtor('Profile', profileCtor, profileInitializer);

        };

        /**
         * Helper function for ensure the type of an entity is the requested
         * param {object} obj - The entity
         * param {string} entityTypeName - The type name
         */
        function ensureEntityType(obj, entityTypeName) {
            if (!obj.entityType || obj.entityType.shortName !== entityTypeName) {
                throw new Error('Object must be an entity of type ' + entityTypeName);
            }
        };

        /**
         * Add Knockout.Validation rules from the entities metadata
         */
        function addValidationRules(entity) {
            var entityType = entity.entityType,
                i,
                property,
                propertyName,
                propertyObject,
                validators,
                u,
                validator,
                nValidator;

            if (entityType) {
                for (i = 0; i < entityType.dataProperties.length; i += 1) {
                    property = entityType.dataProperties[i];
                    propertyName = property.name;
                    propertyObject = entity[propertyName];
                    validators = [];

                    for (u = 0; u < property.validators.length; u += 1) {
                        validator = property.validators[u];
                        nValidator = {
                            propertyName: propertyName,
                            validator: function (val) {
                                var error = this.innerValidator.validate(val, { displayName: this.propertyName });
                                this.message = error ? error.errorMessage : "";
                                return error === null;
                            },
                            message: "",
                            innerValidator: validator
                        };
                        validators.push(nValidator);
                    }
                    propertyObject.extend({
                        validation: validators
                    });
                }

                for (i = 0; i < entityType.foreignKeyProperties.length; i += 1) {
                    property = entityType.foreignKeyProperties[i];
                    propertyName = property.name;
                    propertyObject = entity[propertyName];

                    validators = [];
                    for (u = 0; u < property.validators.length; u += 1) {
                        validator = property.validators[u];
                        nValidator = {
                            propertyName: propertyName,
                            validator: function (val) {
                                var error = this.innerValidator.validate(val, { displayName: this.propertyName });
                                this.message = error ? error.errorMessage : "";
                                return error === null;
                            },
                            message: "",
                            innerValidator: validator
                        };
                        validators.push(nValidator);
                    }
                    propertyObject.extend({
                        validation: validators
                    });
                    if (!property.isNullable) {
                        //Bussiness Rule: 0 is not allowed for required foreign keys
                        propertyObject.extend({ notEqual: foreignKeyInvalidValue });
                    }
                }
            }
        };

        /**
         * Extend the entity with a has errors property
         * param {object} entity - The entity
         */
        function addhasValidationErrorsProperty(entity) {

            var prop = ko.observable(false);

            var onChange = function () {
                var hasError = entity.entityAspect.getValidationErrors().length > 0;
                if (prop() === hasError) {
                    // collection changed even though entity net error state is unchanged
                    prop.valueHasMutated(); // force notification
                } else {
                    prop(hasError); // change the value and notify
                }
            };

            onChange();             // check now ...
            entity.entityAspect // ... and when errors collection changes
                .validationErrorsChanged.subscribe(onChange);

            // observable property is wired up; now add it to the entity
            entity.hasValidationErrors = prop;
        };
    });