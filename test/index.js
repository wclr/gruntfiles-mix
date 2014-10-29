var exec = require('child_process').exec,
    child;

process.chdir(__dirname)

child = exec('grunt --help',
    function (error, stdout, stderr) {
        if (error) {
            console.log('test exec error: ' + error);
        } else {
            //console.log('stdout ' + stdout);
            if (stdout.indexOf(' app1-task1  Custom task.') > 0){
                console.log('app1-task1 is is ok!')
            } else {
                console.log('ERROR: app1-task1 is is NOT ok!')
            }
            if (stdout.indexOf(' app2-task2  Custom task.') > 0){
                console.log('app2-task2 is is ok!')
            } else {
                console.log('ERROR: app2-task2 is is NOT ok!')
            }


        }
    });