var exec = require('child_process').exec,
    child;

process.chdir(__dirname)

child = exec('grunt --help',
    function (error, stdout, stderr) {
        if (error) {
            console.log('test exec error: ' + error);
        } else {
            if (stdout.indexOf('app1-task1  Custom task.') > 0 && stdout.indexOf('app2-task2  Custom task.') > 0){
                console.log('Tasks is ok!')
            }
        }
    });