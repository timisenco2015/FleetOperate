var awsCredentials = new AWS.config.loadFromPath('./aws-credentials.json');
var credentials = new AWS.config.credentials(awsCredentials);
var S3 = new AWS.S3(credentials);
S3.putObject;
//# sourceMappingURL=aws-sdk.js.map