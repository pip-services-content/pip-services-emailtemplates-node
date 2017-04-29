let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { EmailTemplateV1 } from '../../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../../src/data/version1/EmailTemplateStatusV1';
import { EmailTemplatesMemoryPersistence } from '../../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../../../src/logic/EmailTemplatesController';
import { EmailTemplatesHttpServiceV1 } from '../../../src/services/version1/EmailTemplatesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TEMPLATE1: EmailTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    reply_to: null,
    subject: { en: 'Text 1' },
    text: { en: 'Text 1' },
    html: { en: 'Text 1' },
    status: EmailTemplateStatusV1.Completed
};
let TEMPLATE2: EmailTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    reply_to: null,
    subject: { en: 'Text 2' },
    text: { en: 'Text 2' },
    html: { en: 'Text 2' },
    status: EmailTemplateStatusV1.Completed
};

suite('EmailTemplatesHttpServiceV1', ()=> {    
    let service: EmailTemplatesHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new EmailTemplatesMemoryPersistence();
        let controller = new EmailTemplatesController();

        service = new EmailTemplatesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emailtemplates', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let template1, template2;

        async.series([
        // Create one template
            (callback) => {
                rest.post('/email_templates/create_template',
                    {
                        template: TEMPLATE1
                    },
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE1.name);
                        assert.equal(template.text.en, TEMPLATE1.text.en);

                        template1 = template;

                        callback();
                    }
                );
            },
        // Create another template
            (callback) => {
                rest.post('/email_templates/create_template', 
                    {
                        template: TEMPLATE2
                    },
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE2.name);
                        assert.equal(template.text.en, TEMPLATE2.text.en);

                        template2 = template;

                        callback();
                    }
                );
            },
        // Get all templates
            (callback) => {
                rest.post('/email_templates/get_templates',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the template
            (callback) => {
                template1.text = { en: 'Updated Content 1' };

                rest.post('/email_templates/update_template',
                    { 
                        template: template1
                    },
                    (err, req, res, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.text.en, 'Updated Content 1');
                        assert.equal(template.name, TEMPLATE1.name);

                        template1 = template;

                        callback();
                    }
                );
            },
        // Delete template
            (callback) => {
                rest.post('/email_templates/delete_template_by_id',
                    {
                        template_id: template1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                rest.post('/email_templates/get_template_by_id',
                    {
                        template_id: template1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});