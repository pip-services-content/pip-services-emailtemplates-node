import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { IEmailTemplatesController } from './IEmailTemplatesController';
export declare class EmailTemplatesController implements IConfigurable, IReferenceable, ICommandable, IEmailTemplatesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EmailTemplateV1>) => void): void;
    getTemplateById(correlationId: string, id: string, callback: (err: any, template: EmailTemplateV1) => void): void;
    getTemplateByIdOrName(correlationId: string, idOrName: string, callback: (err: any, template: EmailTemplateV1) => void): void;
    createTemplate(correlationId: string, template: EmailTemplateV1, callback: (err: any, template: EmailTemplateV1) => void): void;
    updateTemplate(correlationId: string, template: EmailTemplateV1, callback: (err: any, template: EmailTemplateV1) => void): void;
    deleteTemplateById(correlationId: string, id: string, callback: (err: any, template: EmailTemplateV1) => void): void;
}
