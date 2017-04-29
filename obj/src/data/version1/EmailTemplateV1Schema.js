"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class EmailTemplateV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('subject', pip_services_commons_node_2.TypeCode.Map);
        this.withRequiredProperty('text', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('html', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('status', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.EmailTemplateV1Schema = EmailTemplateV1Schema;
//# sourceMappingURL=EmailTemplateV1Schema.js.map