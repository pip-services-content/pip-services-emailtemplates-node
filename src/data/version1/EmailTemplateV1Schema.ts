import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class EmailTemplateV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('reply_to', TypeCode.String);
        this.withRequiredProperty('subject', TypeCode.Map);
        this.withRequiredProperty('text', TypeCode.Map);
        this.withOptionalProperty('html', TypeCode.Map);
        this.withOptionalProperty('status', TypeCode.String);
    }
}
