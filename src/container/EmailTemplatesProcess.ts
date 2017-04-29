import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EmailTemplatesServiceFactory } from '../build/EmailTemplatesServiceFactory';

export class EmailTemplatesProcess extends ProcessContainer {

    public constructor() {
        super("email_templates", "Email templates microservice");
        this._factories.add(new EmailTemplatesServiceFactory);
    }


}
