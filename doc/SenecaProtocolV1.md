# Seneca Protocol (version 1) <br/> Email Templates Microservice

EmailTemplates microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'emailtemplates',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [EmailTemplateV1 class](#class1)
* [cmd: 'get_templates'](#operation1)
* [cmd: 'get_template_by_id'](#operation2)
* [cmd: 'get_template_by_id_or_name'](#operation3)
* [cmd: 'create_template'](#operation4)
* [cmd: 'update_template'](#operation5)
* [cmd: 'delete_template_by_id'](#operation6)

## Data types

### <a name="class1"></a> EmailTemplateV1 class

Represents an email template

**Properties:**
- id: string - unique template id
- name: string - template name
- subject: MultiString - email subject in different languages
- text: MultiString - email text body in different languages
- html: MultiString - email html body in different languages
- status: string - editing status of the emailtemplate: 'new', 'writing', 'translating', 'completed' (default: 'new')

## Operations

### <a name="operation1"></a> Cmd: 'get_templates'

Retrieves a collection of email templates according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - name: string - (optional) template name
  - status: string - (optional) template editing status
  - search: string - (optional) free text search
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<EmailTemplateV1> - retrieved emailtemplates in page format

### <a name="operation2"></a> Cmd: 'get\_template\_by\_id'

Retrieves a single email template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique EmailTemplateV1 object id

**Returns:**
- err: Error - occured error or null for success
- result: EmailTemplateV1 - retrieved email template, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'get\_template\_by\_id\_or\_name'

Retrieves a firdt found email template specified by its id or name

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- id\_or\_name: string - unique EmailTemplateV1 object id

**Returns:**
- err: Error - occured error or null for success
- result: EmailTemplateV1 - retrieved email template, null if object wasn't found 

### <a name="operation4"></a> Cmd: 'create_template'

Creates a new email template

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: EmailTemplateV1 - EmailTemplateV1 object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: EmailTemplateV1 - created email template object

### <a name="operation5"></a> Cmd: 'update_template'

Updates email template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template: EmailTemplateV1 - template object with new values.

**Returns:**
- err: Error - occured error or null for success
- result: EmailTemplateV1 - updated email template object 
 
### <a name="operation6"></a> Cmd: 'delete\_template\_by_id'

Deletes email template specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- template_id: string - unique email template id

**Returns:**
- err: Error - occured error or null for success

 