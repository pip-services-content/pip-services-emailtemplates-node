"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const EmailTemplateV1Schema_1 = require("../data/version1/EmailTemplateV1Schema");
class EmailTemplatesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetEmailTemplatesCommand() {
        return new pip_services_commons_node_2.Command("get_templates", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getTemplates(correlationId, filter, paging, callback);
        });
    }
    makeGetEmailTemplateByIdCommand() {
        return new pip_services_commons_node_2.Command("get_template_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('template_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsString("template_id");
            this._logic.getTemplateById(correlationId, id, callback);
        });
    }
    makeGetEmailTemplateByIdOrNameCommand() {
        return new pip_services_commons_node_2.Command("get_template_by_id_or_name", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('id_or_name', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let idOrName = args.getAsString("id_or_name");
            this._logic.getTemplateByIdOrName(correlationId, idOrName, callback);
        });
    }
    makeCreateEmailTemplateCommand() {
        return new pip_services_commons_node_2.Command("create_template", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('template', new EmailTemplateV1Schema_1.EmailTemplateV1Schema()), (correlationId, args, callback) => {
            let template = args.get("template");
            this._logic.createTemplate(correlationId, template, callback);
        });
    }
    makeUpdateEmailTemplateCommand() {
        return new pip_services_commons_node_2.Command("update_template", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('template', new EmailTemplateV1Schema_1.EmailTemplateV1Schema()), (correlationId, args, callback) => {
            let template = args.get("template");
            this._logic.updateTemplate(correlationId, template, callback);
        });
    }
    makeDeleteEmailTemplateByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_template_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('template_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("template_id");
            this._logic.deleteTemplateById(correlationId, id, callback);
        });
    }
}
exports.EmailTemplatesCommandSet = EmailTemplatesCommandSet;
//# sourceMappingURL=EmailTemplatesCommandSet.js.map