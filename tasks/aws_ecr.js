/*
 * grunt-aws-ecr
 * https://github.com/johnhalbert/grunt-aws-ecr
 *
 * Copyright (c) 2017 John Halbert
 * Licensed under the MIT license.
 */

'use strict';

const Promise = require('bluebird'),
      ECR     = require('aws-sdk/clients/ecr'),

module.exports = function(grunt) {
  grunt.registerMultiTask('aws_ecr', 'Grunt plugin for AWS\'s Elastic Container Repository service.', function() {
    const options      = this.options(),
          ecr          = Promise.promisifyAll(new ECR(options)),
          { command,
            callback } = this.data,
          done         = this.async();

    if (isEcrCommand(command))
      runEcrCommand(command, this.data)
        .then(callback)
        .then(done)
        .catch(err => grunt.log.error(err.message));

    function isEcrCommand(cmd) {
      return ~[ 'batch-check-layer-availability',
                'batch-delete-image',
                'batch-get-image',
                'complete-layer-upload',
                'create-repository',
                'delete-lifecycle-policy',
                'delete-repository',
                'delete-repository-policy',
                'describe-images',
                'describe-repositories',
                'get-authorization-token',
                'get-download-url-for-layer',
                'get-lifecycle-policy',
                'get-lifecycle-policy-preview',
                'get-repository-policy',
                'initiate-layer-upload',
                'list-images',
                'put-image',
                'put-lifecycle-policy',
                'set-repository-policy',
                'start-lifecycle-policy-preview',
                'upload-layer-part' ]
             .indexOf(cmd);
    }

    function runEcrCommand(cmd, params) {
      return ecr[`${kebabToCamel(cmd)}Async`](params);
    }

    function kebabToCamel(kebab) {
      let camel = kebab.split('-').reduce((camel, part, i) => {
        if (i > 0)
          camel += part[0].toUpperCase() + part.substr(1).toLowerCase();

        return camel;
      }, '');
    }
  });
};
