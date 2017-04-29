import { ConfigParams } from 'pip-services-commons-node';

import { EmailTemplatesMemoryPersistence } from '../../src/persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesPersistenceFixture } from './EmailTemplatesPersistenceFixture';

suite('EmailTemplatesMemoryPersistence', ()=> {
    let persistence: EmailTemplatesMemoryPersistence;
    let fixture: EmailTemplatesPersistenceFixture;
    
    setup((done) => {
        persistence = new EmailTemplatesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new EmailTemplatesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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