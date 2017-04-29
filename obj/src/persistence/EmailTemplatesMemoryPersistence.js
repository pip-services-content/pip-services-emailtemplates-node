"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class EmailTemplatesMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchMultilanguageString(value, search) {
        for (let prop in value) {
            if (value.hasOwnProperty(prop)) {
                let text = '' + value[prop];
                if (this.matchString(text, search))
                    return true;
            }
        }
        return false;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchMultilanguageString(item.subject, search))
            return true;
        if (this.matchMultilanguageString(item.text, search))
            return true;
        if (this.matchMultilanguageString(item.html, search))
            return true;
        if (this.matchString(item.status, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let status = filter.getAsNullableString('status');
        let name = filter.getAsNullableString('name');
        return (item) => {
            if (id && item.id != id)
                return false;
            if (name && item.name != name)
                return false;
            if (status && item.status != status)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByIdOrName(correlationId, idOrName, callback) {
        let item = _.find(this._items, (item) => item.id == idOrName || item.name == idOrName);
        if (item != null) {
            this._logger.trace(correlationId, "Found item by %s", idOrName);
            callback(null, item);
        }
        else {
            this._logger.trace(correlationId, "Found item by %s", idOrName);
            let err = new pip_services_commons_node_2.NotFoundException(correlationId, 'EMAIL_TEMPLATE_NOT_FOUND', 'Email template ' + idOrName + ' was not found').withDetails('id_or_name', idOrName);
            callback(err, null);
        }
    }
}
exports.EmailTemplatesMemoryPersistence = EmailTemplatesMemoryPersistence;
//# sourceMappingURL=EmailTemplatesMemoryPersistence.js.map