import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { EmailTemplatesMongoDbPersistence } from '../persistence/EmailTemplatesMongoDbPersistence';
import { EmailTemplatesFilePersistence } from '../persistence/EmailTemplatesFilePersistence';
import { EmailTemplatesMemoryPersistence } from '../persistence/EmailTemplatesMemoryPersistence';
import { EmailTemplatesController } from '../logic/EmailTemplatesController';
import { EmailTemplatesHttpServiceV1 } from '../services/version1/EmailTemplatesHttpServiceV1';
import { EmailTemplatesSenecaServiceV1 } from '../services/version1/EmailTemplatesSenecaServiceV1'; 

export class EmailTemplatesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-emailtemplates", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-emailtemplates", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-emailtemplates", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-emailtemplates", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-emailtemplates", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-emailtemplates", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-emailtemplates", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailTemplatesServiceFactory.MemoryPersistenceDescriptor, EmailTemplatesMemoryPersistence);
		this.registerAsType(EmailTemplatesServiceFactory.FilePersistenceDescriptor, EmailTemplatesFilePersistence);
		this.registerAsType(EmailTemplatesServiceFactory.MongoDbPersistenceDescriptor, EmailTemplatesMongoDbPersistence);
		this.registerAsType(EmailTemplatesServiceFactory.ControllerDescriptor, EmailTemplatesController);
		this.registerAsType(EmailTemplatesServiceFactory.SenecaServiceDescriptor, EmailTemplatesSenecaServiceV1);
		this.registerAsType(EmailTemplatesServiceFactory.HttpServiceDescriptor, EmailTemplatesHttpServiceV1);
	}
	
}
