var fs = require('fs'),
    path = require('path'),
    extend = require('xtend')


var defaults = {
    prefixSeparator: '-'
}

module.exports = function(grunt, options){

    options = extend(defaults ,options)

    var baseDir = process.cwd()


    var list = fs.readdirSync(baseDir).map(function(name){
        return path.join(baseDir, name, 'Gruntfile.js')
    }).filter(function(f){return fs.existsSync(f)})

    var config = {}

    list.forEach(function(gruntfile){
        var dir = path.dirname(gruntfile),
            name = path.basename(dir)
        process.chdir(dir)
        var prefix = name.substring(0, name.indexOf('-'))
        prefix += options.prefixSeparator
        require(gruntfile)(grunt, config, prefix)
    })

    process.chdir(baseDir)
    grunt.initConfig(config)

}
