"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EmailTemplatesMongoDbPersistence_1 = require("../persistence/EmailTemplatesMongoDbPersistence");
const EmailTemplatesFilePersistence_1 = require("../persistence/EmailTemplatesFilePersistence");
const EmailTemplatesMemoryPersistence_1 = require("../persistence/EmailTemplatesMemoryPersistence");
const EmailTemplatesController_1 = require("../logic/EmailTemplatesController");
const EmailTemplatesHttpServiceV1_1 = require("../services/version1/EmailTemplatesHttpServiceV1");
const EmailTemplatesSenecaServiceV1_1 = require("../services/version1/EmailTemplatesSenecaServiceV1");
class EmailTemplatesServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailTemplatesServiceFactory.MemoryPersistenceDescriptor, EmailTemplatesMemoryPersistence_1.EmailTemplatesMemoryPersistence);
        this.registerAsType(EmailTemplatesServiceFactory.FilePersistenceDescriptor, EmailTemplatesFilePersistence_1.EmailTemplatesFilePersistence);
        this.registerAsType(EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor, EmailTemplatesMongoDbPersistence_1.EmailTemplatesMongoDbPersistence);
        this.registerAsType(EmailTemplatesServiceFactory.ControllerDescriptor, EmailTemplatesController_1.EmailTemplatesController);
        this.registerAsType(EmailTemplatesServiceFactory.SenecaServiceDescriptor, EmailTemplatesSenecaServiceV1_1.EmailTemplatesSenecaServiceV1);
        this.registerAsType(EmailTemplatesServiceFactory.HttpServiceDescriptor, EmailTemplatesHttpServiceV1_1.EmailTemplatesHttpServiceV1);
    }
}
EmailTemplatesServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "factory", "default", "default", "1.0");
EmailTemplatesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "persistence", "memory", "*", "1.0");
EmailTemplatesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "persistence", "file", "*", "1.0");
EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "persistence", "mongodb", "*", "1.0");
EmailTemplatesServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "controller", "default", "*", "1.0");
EmailTemplatesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "service", "seneca", "*", "1.0");
EmailTemplatesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailtemplates", "service", "http", "*", "1.0");
exports.EmailTemplatesServiceFactory = EmailTemplatesServiceFactory;
//# sourceMappingURL=EmailTemplatesServiceFactory.js.map