import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { EmailTemplatesMemoryPersistence } from './EmailTemplatesMemoryPersistence';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';

export class EmailTemplatesFilePersistence extends EmailTemplatesMemoryPersistence {
	protected _persister: JsonFilePersister<EmailTemplateV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<EmailTemplateV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}