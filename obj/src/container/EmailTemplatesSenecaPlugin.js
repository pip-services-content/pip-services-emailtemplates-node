"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const EmailTemplatesMemoryPersistence_1 = require("../persistence/EmailTemplatesMemoryPersistence");
const EmailTemplatesFilePersistence_1 = require("../persistence/EmailTemplatesFilePersistence");
const EmailTemplatesMongoDbPersistence_1 = require("../persistence/EmailTemplatesMongoDbPersistence");
const EmailTemplatesController_1 = require("../logic/EmailTemplatesController");
const EmailTemplatesSenecaServiceV1_1 = require("../services/version1/EmailTemplatesSenecaServiceV1");
class EmailTemplatesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-emailtemplates', seneca, EmailTemplatesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new EmailTemplatesController_1.EmailTemplatesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new EmailTemplatesMongoDbPersistence_1.EmailTemplatesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EmailTemplatesFilePersistence_1.EmailTemplatesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EmailTemplatesMemoryPersistence_1.EmailTemplatesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new EmailTemplatesSenecaServiceV1_1.EmailTemplatesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-emailtemplates', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-emailtemplates', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-emailtemplates', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.EmailTemplatesSenecaPlugin = EmailTemplatesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new EmailTemplatesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=EmailTemplatesSenecaPlugin.js.map