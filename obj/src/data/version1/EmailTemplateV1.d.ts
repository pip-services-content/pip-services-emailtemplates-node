import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
export declare class EmailTemplateV1 implements IStringIdentifiable {
    constructor(name: string, subject: any, text: any, html: any, status?: string);
    id: string;
    name: string;
    subject: MultiString;
    text: MultiString;
    html: MultiString;
    status: string;
}
