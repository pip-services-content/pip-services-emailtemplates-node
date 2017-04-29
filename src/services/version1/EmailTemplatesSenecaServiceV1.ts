import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class EmailTemplatesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('email_templates');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailtemplates', 'controller', 'default', '*', '1.0'));
    }
}