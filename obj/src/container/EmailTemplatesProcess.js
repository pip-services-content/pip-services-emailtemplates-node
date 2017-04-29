"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EmailTemplatesServiceFactory_1 = require("../build/EmailTemplatesServiceFactory");
class EmailTemplatesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email_templates", "Email templates microservice");
        this._factories.add(new EmailTemplatesServiceFactory_1.EmailTemplatesServiceFactory);
    }
}
exports.EmailTemplatesProcess = EmailTemplatesProcess;
//# sourceMappingURL=EmailTemplatesProcess.js.map