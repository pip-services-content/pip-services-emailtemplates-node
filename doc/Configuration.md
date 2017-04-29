# Configuration Guide <br/> EmailTemplates Microservice

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure.

Example **config.yaml** file:

```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-emailtemplates"
  description: "EmailTemplates microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-emailtemplates:persistence:file:default:1.0"
  path: "./data/email_templates.json"

- descriptor: "pip-services-emailtemplates:controller:default:default:1.0"

- descriptor: "pip-services-emailtemplates:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```
