"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EmailTemplatesSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('email_templates');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emailtemplates', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailTemplatesSenecaServiceV1 = EmailTemplatesSenecaServiceV1;
//# sourceMappingURL=EmailTemplatesSenecaServiceV1.js.map