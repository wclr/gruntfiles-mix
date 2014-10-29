var fs = require('fs'),
    path = require('path'),
    extend = require('xtend')


var defaults = {
    prefixSeparator: '-',
    useNamePartAsPrefix: true,
    addPrefix: false
}

module.exports = function(options){

    options = extend(defaults ,options)

    return function(grunt, config){

        if (!grunt){
            console.log('Gruntfiles-mix: please pass grunt object.')
            return
        }

        var baseDir = process.cwd() || options.baseDir

        process.chdir(baseDir)

        // find child directories with Gruntfile.js
        var list = fs.readdirSync(baseDir).map(function(name){
            return path.join(baseDir, name, 'Gruntfile.js')
        }).filter(function(f){return fs.existsSync(f)})

        config = config || {}

        var oldRegisterTask = grunt.registerTask

        list.forEach(function(gruntfile){
            var dir = path.dirname(gruntfile),
                name = path.basename(dir)
            process.chdir(dir)
            if (options.addPrefix){

                var namePart = name.match(/^[\w\d]*/i),
                    prefix = (options.useNamePartAsPrefix && namePart && namePart[0]) || name

                prefix && (prefix += options.prefixSeparator)
                grunt.registerTask = function(){
                    var args = Array.prototype.slice.call(arguments);
                    args[0] = prefix + args[0]
                    oldRegisterTask.apply(grunt, args)
                }
            }

            require(gruntfile)(grunt, config)
        })

        process.chdir(baseDir)
        grunt.registerTask = oldRegisterTask

        if (arguments.length == 1){
            grunt.initConfig(config)
        }

        return config
    }
}
