import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { EmailTemplatesMemoryPersistence } from './EmailTemplatesMemoryPersistence';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
export declare class EmailTemplatesFilePersistence extends EmailTemplatesMemoryPersistence {
    protected _persister: JsonFilePersister<EmailTemplateV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
