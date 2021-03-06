import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';

export interface IEmailTemplatesPersistence extends IGetter<EmailTemplateV1, string>, IWriter<EmailTemplateV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<EmailTemplateV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: EmailTemplateV1) => void): void;

    getOneByIdOrName(correlationId: string, idOrName: string, 
        callback: (err: any, item: EmailTemplateV1) => void): void;

    create(correlationId: string, item: EmailTemplateV1, 
        callback: (err: any, item: EmailTemplateV1) => void): void;

    update(correlationId: string, item: EmailTemplateV1, 
        callback: (err: any, item: EmailTemplateV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: EmailTemplateV1) => void): void;
}
