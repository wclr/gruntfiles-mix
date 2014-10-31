### Mix Gruntfiles!

Combines tasks from multiple Gruntfiles in sub folders.

Takes tasks Gruntfiles.js from (direct) child folders and combines them into single tasks list!

### Installation

> npm install grunt
> npm install gruntfiles-mix

After install if no Gruntfile.js in install directory the default one is created automatically:

```js
/* Default gruntfile-mix Gruntfile.js */
module.exports = require('gruntfiles-mix')({
		addPrefix: true,
    	useNamePartAsPrefix: true,
    	prefixSeparator: '-'
});
```

### You can use options to modify the behaviour

#### addPrefix
Type: `Boolean`
Default value: `false`

Adds directory name as prefix to task name.

#### useNamePartAsPrefix
Type: `Boolean`
Default value: `true`

Adds only first symbolic part for directory name as prefix (for directory "front-app" will take "front" as prefix).

#### prefixSeparator
Type: `String`
Default value: `-`

Character(s) that separates prefix from task.

### Gruntfiles with tasks

You typical grunt file in sub directories when used in Gruntfiles-mix scenario should modify supplied grunt config object
and register needed tasks, but not initialize grunt configuration.

```js
module.exports = function(grunt, config){

	// create your config if none is passed
	config = config || {}

	// define project/directory specific tasks
	grunt.loadNpmTasks('grunt-contrib-clean')

	// assume that clean tasks may already exist in config
	config.clean = config.clean || {}

    // to avoid problems with paths resolution prefer to use absolute paths in tasks (using ```__dirname```)
    // while execution of tasks CWD is Gruntfiles-mix dir, NOT __dirname of current Gruntfile.
	config.clean.dist = [__dirname + '/dist']

	// register custom task
	grunt.registerTask('clean-dist', ['clean:dist'])

	 // make possible to use this Gruntfile as usual (if only "grunt" argument is passed)
	 if (arguments.length == 1){
	    grunt.initConfig(config)
	 }
};
```

### Caution!

Each time grunt.loadNmpTask in certain Gruntfile is executed it loads tasks (grunt module) from respective folder.
If different Gruntfiles use the same modules with different versions tasks will be executed using last one loaded.

### Tests

For test use command: node test