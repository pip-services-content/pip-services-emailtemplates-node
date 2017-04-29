"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EmailTemplateStatusV1_1 = require("../data/version1/EmailTemplateStatusV1");
const EmailTemplatesCommandSet_1 = require("./EmailTemplatesCommandSet");
class EmailTemplatesController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(EmailTemplatesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EmailTemplatesCommandSet_1.EmailTemplatesCommandSet(this);
        return this._commandSet;
    }
    getTemplates(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getTemplateById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    getTemplateByIdOrName(correlationId, idOrName, callback) {
        this._persistence.getOneByIdOrName(correlationId, idOrName, callback);
    }
    createTemplate(correlationId, template, callback) {
        template.status = template.status || EmailTemplateStatusV1_1.EmailTemplateStatusV1.New;
        this._persistence.create(correlationId, template, callback);
    }
    updateTemplate(correlationId, template, callback) {
        template.status = template.status || EmailTemplateStatusV1_1.EmailTemplateStatusV1.New;
        this._persistence.update(correlationId, template, callback);
    }
    deleteTemplateById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
EmailTemplatesController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-emailtemplates:persistence:*:*:1.0');
exports.EmailTemplatesController = EmailTemplatesController;
//# sourceMappingURL=EmailTemplatesController.js.map