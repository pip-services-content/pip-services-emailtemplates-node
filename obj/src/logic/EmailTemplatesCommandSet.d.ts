import { CommandSet } from 'pip-services-commons-node';
import { IEmailTemplatesController } from './IEmailTemplatesController';
export declare class EmailTemplatesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmailTemplatesController);
    private makeGetEmailTemplatesCommand();
    private makeGetEmailTemplateByIdCommand();
    private makeGetEmailTemplateByIdOrNameCommand();
    private makeCreateEmailTemplateCommand();
    private makeUpdateEmailTemplateCommand();
    private makeDeleteEmailTemplateByIdCommand();
}
