"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const EmailTemplatesServiceFactory_1 = require("../build/EmailTemplatesServiceFactory");
class EmailTemplatesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("email_templates", "Email templates function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emailtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailTemplatesServiceFactory_1.EmailTemplatesServiceFactory());
    }
}
exports.EmailTemplatesLambdaFunction = EmailTemplatesLambdaFunction;
exports.handler = new EmailTemplatesLambdaFunction().getHandler();
//# sourceMappingURL=EmailTemplatesLambdaFunction.js.map