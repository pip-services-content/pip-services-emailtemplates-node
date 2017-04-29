let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailTemplateV1 } from '../../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../../src/data/version1/EmailTemplateStatusV1';
import { EmailTemplatesMemoryPersistence } from '../../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../../../src/logic/EmailTemplatesController';
import { EmailTemplatesSenecaServiceV1 } from '../../../src/services/version1/EmailTemplatesSenecaServiceV1';

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

suite('EmailTemplatesSenecaServiceV1', ()=> {        
    let seneca: any;
    let service: EmailTemplatesSenecaServiceV1;
    let persistence: EmailTemplatesMemoryPersistence;
    let controller: EmailTemplatesController;

    suiteSetup((done) => {
        persistence = new EmailTemplatesMemoryPersistence();
        controller = new EmailTemplatesController();

        service = new EmailTemplatesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-emailtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emailtemplates', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var template1, template2;

        async.series([
        // Create one template
            (callback) => {
                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'create_template',
                        template: TEMPLATE1
                    },
                    (err, template) => {
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
                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'create_template',
                        template: TEMPLATE2
                    },
                    (err, template) => {
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
                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'get_templates' 
                    },
                    (err, page) => {
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

                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'update_template',
                        template: template1
                    },
                    (err, template) => {
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
                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'delete_template_by_id',
                        template_id: template1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                seneca.act(
                    {
                        role: 'email_templates',
                        cmd: 'get_template_by_id',
                        template_id: template1.id
                    },
                    (err, template) => {
                        assert.isNull(err);

                        assert.isNull(template || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});