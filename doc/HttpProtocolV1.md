# HTTP Protocol (version 1) <br/> Email Templates Microservice

EmailTemplates microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [EmailTemplateV1 class](#class1)
* [POST /email_templates/get_templates](#operation1)
* [POST /email_templates/get_template_by_id](#operation2)
* [POST /email_templates/get_template_by_id_or_name](#operation3)
* [POST /email_templates/create_template](#operation4)
* [POST /email_templates/update_template](#operation5)
* [POST /email_templates/delete_template_id](#operation6)

## Data types

### <a name="class1"></a> EmailTemplateV1 class

Represents an email template

**Properties:**
- id: string - unique template id
- name: string - template name
- from: string - sender address
- reply_to: string - sender replyto address
- subject: MultiString - email subject in different languages
- text: MultiString - email text body in different languages
- html: MultiString - email html body in different languages
- status: string - editing status of the emailtemplate: 'new', 'writing', 'translating', 'completed' (default: 'new')

## Operations

### <a name="operation1"></a> Method: 'POST', route '/email\_templates/get_templates'

Retrieves a collection of email templates according to specified criteria

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: Object
  - name: string - (optional) template name
  - status: string - (optional) template editing status
  - search: string - (optional) free text search
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<EmailTemplateV1> object is paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/email\_templates/get\_template\_by_id'

Retrieves a single email template specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique email template id

**Response body:**
EmailTemplateV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/email\_templates/get\_template\_by_id\_or\_name'

Retrieves first found email template specified by its unique id or name

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- id\_or\_name: string - template id or name

**Response body:**
EmailTemplateV1 object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/email\_templates/create_template'

Creates a new email template

**Request body:**
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: EmailTemplateV1 - EmailTemplate object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created EmailTemplateV1 object or error

### <a name="operation5"></a> Method: 'POST', route '/email_templates/update\_template'

Updates email template specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: EmailTemplateV1 - EmailTemplate object with new values.

**Response body:**
Updated EmailTemplateV1 object or error 
 
### <a name="operation6"></a> Method: 'POST', route '/email\_templates/delete\_template\_by_id'

Deletes email template specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique email template id

**Response body:**
Occured error or null for success
 
