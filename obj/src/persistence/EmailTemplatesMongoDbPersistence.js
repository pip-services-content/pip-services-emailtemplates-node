"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const EmailTemplatesMongoDbSchema_1 = require("./EmailTemplatesMongoDbSchema");
class EmailTemplatesMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('emailtemplates', EmailTemplatesMongoDbSchema_1.EmailTemplatesMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ status: { $regex: searchRegex } });
            searchCriteria.push({ 'subject.en': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.de': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'text.en': { $regex: searchRegex } });
            searchCriteria.push({ 'text.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'text.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'text.de': { $regex: searchRegex } });
            searchCriteria.push({ 'text.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'html.en': { $regex: searchRegex } });
            searchCriteria.push({ 'html.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'html.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'html.de': { $regex: searchRegex } });
            searchCriteria.push({ 'html.ru': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });
        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByIdOrName(correlationId, idOrName, callback) {
        let filter = {
            $or: [
                { _id: idOrName },
                { name: idOrName }
            ]
        };
        this._model.findOne(filter, (err, item) => {
            if (!err)
                this._logger.trace(correlationId, "Retrieved from %s by %s", this._collection, idOrName);
            if (item == null) {
                err = new pip_services_commons_node_2.NotFoundException(correlationId, 'EMAIL_TEMPLATE_NOT_FOUND', 'Email template ' + idOrName + ' was not found').withDetails('id_or_name', idOrName);
            }
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
}
exports.EmailTemplatesMongoDbPersistence = EmailTemplatesMongoDbPersistence;
//# sourceMappingURL=EmailTemplatesMongoDbPersistence.js.map