let _ = require('lodash');

import { IdGenerator } from 'pip-services-commons-node';
import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
import { EmailTemplateStatusV1 } from './EmailTemplateStatusV1';

export class EmailTemplateV1 implements IStringIdentifiable {

    public constructor(
        name: string, subject: any, text: any, html: any, status?: string) {
        
        this.id = IdGenerator.nextLong();
        this.name = name;
        this.subject = _.isString(subject) ? { en: subject } : subject;
        this.text = _.isString(text) ? { en: text } : text;
        this.html = _.isString(html) ? { en: html } : html;
        this.status = status || EmailTemplateStatusV1.New;
    }

    public id: string;
    public name: string;
    public subject: MultiString;
    public text: MultiString;
    public html: MultiString;
    public status: string;

}