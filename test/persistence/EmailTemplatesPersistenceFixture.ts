let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { EmailTemplateV1 } from '../../src/data/version1/EmailTemplateV1';
import { EmailTemplateStatusV1 } from '../../src/data/version1/EmailTemplateStatusV1';

import { IEmailTemplatesPersistence } from '../../src/persistence/IEmailTemplatesPersistence';

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
let TEMPLATE3: EmailTemplateV1 = {
    id: '3',
    name: 'template3',
    from: null,
    reply_to: null,
    subject: { en: 'Text 2' },
    text: { en: 'Text 2' },
    html: { en: 'Text 2' },
    status: EmailTemplateStatusV1.Translating
};

export class EmailTemplatesPersistenceFixture {
    private _persistence: IEmailTemplatesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateEmailTemplates(done) {
        async.series([
        // Create one template
            (callback) => {
                this._persistence.create(
                    null,
                    TEMPLATE1,
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE1.name);
                        assert.equal(template.status, TEMPLATE1.status);
                        assert.equal(template.text.en, TEMPLATE1.text.en);

                        callback();
                    }
                );
            },
        // Create another template
            (callback) => {
                this._persistence.create(
                    null,
                    TEMPLATE2,
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE2.name);
                        assert.equal(template.status, TEMPLATE2.status);
                        assert.equal(template.text.en, TEMPLATE2.text.en);

                        callback();
                    }
                );
            },
        // Create yet another emailtemplate
            (callback) => {
                this._persistence.create(
                    null,
                    TEMPLATE3,
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.name, TEMPLATE3.name);
                        assert.equal(template.status, TEMPLATE3.status);
                        assert.equal(template.text.en, TEMPLATE3.text.en);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let template1: EmailTemplateV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateEmailTemplates(callback);
            },
        // Get all emailtemplates
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        template1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the template
            (callback) => {
                template1.text.en = 'Updated Content 1';

                this._persistence.update(
                    null,
                    template1,
                    (err, template) => {
                        assert.isNull(err);

                        assert.isObject(template);
                        assert.equal(template.text.en, 'Updated Content 1');
                        assert.equal(template.id, template1.id);

                        callback();
                    }
                );
            },
        // Get delete template by name
            (callback) => {
                this._persistence.getOneByIdOrName(
                    null,
                    template1.name,
                    (err, template) => {
                        assert.isNull(err);

                        assert.equal(template.id, template1.id);

                        callback();
                    }
                );
            },
        // Delete template
            (callback) => {
                this._persistence.deleteById(
                    null,
                    template1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete template
            (callback) => {
                this._persistence.getOneById(
                    null,
                    template1.id,
                    (err, template) => {
                        assert.isNull(err);

                        assert.isNull(template || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create templates
            (callback) => {
                this.testCreateEmailTemplates(callback);
            },
        // Get templates filtered by name
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        name: TEMPLATE1.name
                    }),
                    new PagingParams(),
                    (err, emailtemplates) => {
                        assert.isNull(err);

                        assert.isObject(emailtemplates);
                        assert.lengthOf(emailtemplates.data, 1);

                        callback();
                    }
                );
            },
        // Get templates searched by substring
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: 'temp'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
        // Get templates filtered by status
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        status: TEMPLATE3.status
                    }),
                    new PagingParams(),
                    (err, emailtemplates) => {
                        assert.isNull(err);

                        assert.isObject(emailtemplates);
                        assert.lengthOf(emailtemplates.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}
