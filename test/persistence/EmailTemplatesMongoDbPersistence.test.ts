import { YamlConfigReader } from 'pip-services-commons-node';

import { EmailTemplatesMongoDbPersistence } from '../../src/persistence/EmailTemplatesMongoDbPersistence';
import { EmailTemplatesPersistenceFixture } from './EmailTemplatesPersistenceFixture';

suite('EmailTemplatesMongoDbPersistence', ()=> {
    let persistence: EmailTemplatesMongoDbPersistence;
    let fixture: EmailTemplatesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new EmailTemplatesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new EmailTemplatesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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