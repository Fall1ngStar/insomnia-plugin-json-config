const untildify = require('untildify');

const fs = require('fs');
const { cpuUsage } = require('process');

module.exports.templateTags = [
  {
    displayName: 'json-config',
    name: 'json-config',
    description: 'Pull data from JSON file',
    args: [
      {
        displayName: 'Choose JSON File',
        help: 'Path to JSON file',
        type: 'file'
      },
      {
        displayName: 'Variable Name',
        description: 'Name of the variable',
        type: 'string'
      } 
    ],
    run(context, path, varName) {
      const expandedPath = untildify(path);
    
      fs.stat(expandedPath, function(err) {
        if (err && err.code === 'ENOENT')
          console.log('File or directory not found');
      });

      const rawData = fs.readFileSync(expandedPath);
      const config = JSON.parse(rawData);
      
      if (config.parsed[varName] === undefined) {
        throw new Error('Variable not found!');
      }

      return config.parsed[varName];
    }
  }
];
