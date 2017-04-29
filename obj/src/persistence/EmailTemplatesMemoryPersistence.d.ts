import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { IEmailTemplatesPersistence } from './IEmailTemplatesPersistence';
export declare class EmailTemplatesMemoryPersistence extends IdentifiableMemoryPersistence<EmailTemplateV1, string> implements IEmailTemplatesPersistence {
    constructor();
    private matchString(value, search);
    private matchMultilanguageString(value, search);
    private matchSearch(item, search);
    private contains(array1, array2);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EmailTemplateV1>) => void): void;
    getOneByIdOrName(correlationId: string, idOrName: string, callback: (err: any, item: EmailTemplateV1) => void): void;
}
