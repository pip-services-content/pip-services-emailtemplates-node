import { ConfigParams } from 'pip-services-commons-node';

import { EmailTemplatesFilePersistence } from '../../src/persistence/EmailTemplatesFilePersistence';
import { EmailTemplatesPersistenceFixture } from './EmailTemplatesPersistenceFixture';

suite('EmailTemplatesFilePersistence', ()=> {
    let persistence: EmailTemplatesFilePersistence;
    let fixture: EmailTemplatesPersistenceFixture;
    
    setup((done) => {
        persistence = new EmailTemplatesFilePersistence('./data/email_templates.test.json');

        fixture = new EmailTemplatesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});