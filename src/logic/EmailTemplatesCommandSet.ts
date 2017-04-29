import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { EmailTemplateV1 } from '../data/version1/EmailTemplateV1';
import { EmailTemplateV1Schema } from '../data/version1/EmailTemplateV1Schema';
import { IEmailTemplatesController } from './IEmailTemplatesController';

export class EmailTemplatesCommandSet extends CommandSet {
    private _logic: IEmailTemplatesController;

    constructor(logic: IEmailTemplatesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetEmailTemplatesCommand());
		this.addCommand(this.makeGetEmailTemplateByIdCommand());
		this.addCommand(this.makeGetEmailTemplateByIdOrNameCommand());
		this.addCommand(this.makeCreateEmailTemplateCommand());
		this.addCommand(this.makeUpdateEmailTemplateCommand());
		this.addCommand(this.makeDeleteEmailTemplateByIdCommand());
    }

	private makeGetEmailTemplatesCommand(): ICommand {
		return new Command(
			"get_templates",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getTemplates(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetEmailTemplateByIdCommand(): ICommand {
		return new Command(
			"get_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsString("template_id");
                this._logic.getTemplateById(correlationId, id, callback);
            }
		);
	}

	private makeGetEmailTemplateByIdOrNameCommand(): ICommand {
		return new Command(
			"get_template_by_id_or_name",
			new ObjectSchema(true)
				.withRequiredProperty('id_or_name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let idOrName = args.getAsString("id_or_name");
                this._logic.getTemplateByIdOrName(correlationId, idOrName, callback);
            }
		);
	}

	private makeCreateEmailTemplateCommand(): ICommand {
		return new Command(
			"create_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new EmailTemplateV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let template = args.get("template");
                this._logic.createTemplate(correlationId, template, callback);
            }
		);
	}

	private makeUpdateEmailTemplateCommand(): ICommand {
		return new Command(
			"update_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new EmailTemplateV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let template = args.get("template");
                this._logic.updateTemplate(correlationId, template, callback);
            }
		);
	}
	
	private makeDeleteEmailTemplateByIdCommand(): ICommand {
		return new Command(
			"delete_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("template_id");
                this._logic.deleteTemplateById(correlationId, id, callback);
			}
		);
	}

}