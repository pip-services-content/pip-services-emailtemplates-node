import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { EmailTemplatesServiceFactory } from '../build/EmailTemplatesServiceFactory';

export class EmailTemplatesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email_templates", "Email templates function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailTemplatesServiceFactory());
    }
}

export const handler = new EmailTemplatesLambdaFunction().getHandler();