define(['services/repository'], function (repository) {

    /**
	 * Repository ctor
	 * @constructor
	*/
    var ContactRepository = (function () {

        var contactrepository = function (entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
            repository.getCtor.call(this, entityManagerProvider, entityTypeName, resourceName, fetchStrategy);

            /**
			 * Find Entity by predicate
			 * @method
			 * @param {string} predicate
			 * @return {promise}
			*/
            this.find = function (predicate, page, count) {
                var query = breeze.EntityQuery
					.from(resourceName)
			        .where(predicate)
                    .expand("PersonalDetails,Address")
					.skip(page * count)
					.take(count);
                alertt("lazy");
                return executeQuery(query);
            };

            function executeQuery(query) {
                return entityManagerProvider.manager()
					.executeQuery(query.using(fetchStrategy || breeze.FetchStrategy.FromServer))
					.then(function (data) { return data.results; });
            }

        };

        contactrepository.prototype = repository.create();
        return contactrepository;
    })();

    return {
        create: create
    };

    /**
	 * Create a new Repository
	 * @method
	 * @param {EntityManagerProvider} entityManagerProvider
	 * @param {string} entityTypeName
	 * @param {string} resourceName
	 * @param {FetchStrategy} fetchStrategy
	 * @return {Repository}
	*/
    function create(entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
        return new ContactRepository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy);
    }
});