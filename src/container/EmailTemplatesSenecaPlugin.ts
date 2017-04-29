import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailTemplatesMemoryPersistence } from '../persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesFilePersistence } from '../persistence/EmailTemplatesFilePersistence';
import { EmailTemplatesMongoDbPersistence } from '../persistence/EmailTemplatesMongoDbPersistence';
import { EmailTemplatesController } from '../logic/EmailTemplatesController';
import { EmailTemplatesSenecaServiceV1 } from '../services/version1/EmailTemplatesSenecaServiceV1';

export class EmailTemplatesSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-emailtemplates', seneca, EmailTemplatesSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new EmailTemplatesController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new EmailTemplatesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EmailTemplatesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EmailTemplatesMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new EmailTemplatesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-emailtemplates', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emailtemplates', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new EmailTemplatesSenecaPlugin(seneca, options);
    return { name: plugin.name };
}