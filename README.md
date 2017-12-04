# grunt-aws-ecr

> Grunt plugin for AWS's Elastic Container Repository service.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-aws-ecr --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-aws-ecr');
```

## The "aws_ecr" task

### Overview
In your project's Gruntfile, add a section named `aws_ecr` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  aws_ecr: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Options configure the ECR service provided by `aws-sdk`.  Valid options can be found in the [AWS JavaScript SDK documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECR.html#constructor-property).  Not all options can be used with this plugin alone.  Specifically `sessionToken`, `credentials` and `credentialsProvider` are unavailable with this plugin alone as they must be instances of classes provided by the AWS SDK not provided by this plugin.

A minimum working configuration for options would be:

```js
{
  accessKeyId:     'STRING_VALUE',
  secretAccessKey: 'STRING_VALUE',
  region:          'us-west-2'
}
```

### Command

Whether your configuration has a single task or multiple targets, each must inlude a `command` property.  Commands are kebab case string in the style of the [AWS cli](http://docs.aws.amazon.com/cli/latest/reference/ecr/index.html#cli-aws-ecr) (e.g. `delete-repository`, `create-repository`, etc.).  CLI commands are all represented by methods in the [SDK ECR service](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECR.html), except for `get-login`.

### Params

Each command corresponds to a method in the [SDK ECR service](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECR.html).  Aside from `command`, noted above and `callback`, noted below, each property in a task's configuration is passed as a parameter to the SDK method.  Valid parameters can be found in the documentation for the corresponding method.  Methods have the same name as the corresponding command, but are in camel case.

### Callback

Each command will receive the callback you provide in its configuration.  The first and only argument will be the response from the AWS ECR service.  This differs from SDK documentation.

### Usage Examples

```js
{
  command:    'get-authorization-token',
  callback:    data => console.log(JSON.stringify(data, null, 2)),
  registryIds: [ 'STRING_VALUE' ]
}
```

`registryIds` in this example is a valid AWS account number in which repository(ies) exist.

## Release History
_(Nothing yet)_
