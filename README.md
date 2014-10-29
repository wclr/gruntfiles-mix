### Mix Gruntfiles!

Combines tasks from multiple Gruntfiles.

Takes tasks Gruntfiles.js from (direct) child folders and combines them into single tasks list!

To avoid problems prefer to use ```absolute paths``` (using ```__dirname```) in your grunt tasks.

If no Gruntfile.js in install directory the default one is created:

```js
/* Default gruntfile-mix Gruntfile.js */
module.exports = require('gruntfiles-mix')({
	// addPrefix: true
});
```

### You can add options

#### addPrefix
Type: `Boolean`
Default value: `false`

Adds directory name as prefix to task name.

#### prefixSeparator
Type: `String`
Default value: `-`

Character(s) that separates prefix from task.

### Gruntfiles with tasks

You typical grunt file in sub directories when used in Gruntfiles-mix scenario should modify supplied grunt config object
and register need tasks, but not initialize grunt. You can use passed prefix to created tasks with it

```js
/* Default gruntfile-mix Gruntfile.js */
module.exports = function(grunt, config, prefix){

	// create your config if none is passed
	config = config || {}
	prefix = prefix || ''

	// define project/directory specific tasks
	grunt.loadNpmTasks('grunt-contrib-clean')

	// assume that clean tasks may already exist in config
	config.clean = config.clean || {}

	config.clean.dist = [__dirname + '/dist']

	// register custom task using prefix
	grunt.registerTask(prefix + 'clean-dist', ['clean:dist'])

	 // make possible to use this Gruntfile as usual (if only "grunt" argument is passed
	 if (arguments.length == 1){
	    grunt.initConfig(config)
	 }
};
```

### Tests

For test use command: node test