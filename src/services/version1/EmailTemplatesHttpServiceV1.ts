import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class EmailTemplatesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/email_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailtemplates', 'controller', 'default', '*', '1.0'));
    }
}