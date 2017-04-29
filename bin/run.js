let EmailTemplatesProcess = require('../obj/src/container/EmailTemplatesProcess').EmailTemplatesProcess;

try {
    new EmailTemplatesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
