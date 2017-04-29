import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../data/version1/EmailTemplateStatusV1';
import { IEmailTemplatesPersistence } from '../persistence/IEmailTemplatesPersistence';
import { IEmailTemplatesController } from './IEmailTemplatesController';
import { EmailTemplatesCommandSet } from './EmailTemplatesCommandSet';

export class EmailTemplatesController implements  IConfigurable, IReferenceable, ICommandable, IEmailTemplatesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-emailtemplates:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EmailTemplatesController._defaultConfig);
    private _persistence: IEmailTemplatesPersistence;
    private _commandSet: EmailTemplatesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEmailTemplatesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmailTemplatesCommandSet(this);
        return this._commandSet;
    }
    
    public getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<EmailTemplateV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getTemplateById(correlationId: string, id: string, 
        callback: (err: any, template: EmailTemplateV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public getTemplateByIdOrName(correlationId: string, idOrName: string, 
        callback: (err: any, template: EmailTemplateV1) => void): void {
        this._persistence.getOneByIdOrName(correlationId, idOrName, callback);
    }

    public createTemplate(correlationId: string, template: EmailTemplateV1, 
        callback: (err: any, template: EmailTemplateV1) => void): void {

        template.status = template.status || EmailTemplateStatusV1.New;

        this._persistence.create(correlationId, template, callback);
    }

    public updateTemplate(correlationId: string, template: EmailTemplateV1, 
        callback: (err: any, template: EmailTemplateV1) => void): void {

        template.status = template.status || EmailTemplateStatusV1.New;

        this._persistence.update(correlationId, template, callback);
    }

    public deleteTemplateById(correlationId: string, id: string,
        callback: (err: any, template: EmailTemplateV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
