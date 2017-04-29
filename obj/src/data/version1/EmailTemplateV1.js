"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const EmailTemplateStatusV1_1 = require("./EmailTemplateStatusV1");
class EmailTemplateV1 {
    constructor(name, subject, text, html, status) {
        this.id = pip_services_commons_node_1.IdGenerator.nextLong();
        this.name = name;
        this.subject = _.isString(subject) ? { en: subject } : subject;
        this.text = _.isString(text) ? { en: text } : text;
        this.html = _.isString(html) ? { en: html } : html;
        this.status = status || EmailTemplateStatusV1_1.EmailTemplateStatusV1.New;
    }
}
exports.EmailTemplateV1 = EmailTemplateV1;
//# sourceMappingURL=EmailTemplateV1.js.map