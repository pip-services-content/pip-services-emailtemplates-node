let EmailTemplatesLambdaFunction = require('../obj/src/container/EmailTemplatesLambdaFunction').EmailTemplatesLambdaFunction;

module.exports = new EmailTemplatesLambdaFunction().getHandler();