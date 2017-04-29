let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EmailTemplateV1 } from '../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../src/data/version1/EmailTemplateStatusV1';
import { EmailTemplatesMemoryPersistence } from '../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../../src/logic/EmailTemplatesController';
import { EmailTemplatesLambdaFunction } from '../../src/container/EmailTemplatesLambdaFunction';

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

suite('EmailTemplatesLambdaFunction', ()=> {
    let lambda: EmailTemplatesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-emailtemplates:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-emailtemplates:controller:default:default:1.0'
        );

        lambda = new EmailTemplatesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var template1, template2;

        async.series([
        // Create one template
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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

                lambda.act(
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
                lambda.act(
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
                lambda.act(
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