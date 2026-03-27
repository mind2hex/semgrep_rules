<?php

function example1(){
    $host = $_GET['host'];           // source
    $cmd = "ping -c 1 " . $host;     // propagation
    system($cmd);                    // sink
}

function example2(){
    $userInput = $_POST['file'];           // source
    $command = "cat /tmp/" . $userInput;   // propagation
    exec($command);     
}

function example3(){
    $ip = $_REQUEST['ip'];                 // source
    $result = shell_exec("nslookup " . $ip); // sink
    echo $result;
}

function example4($input){
    $output = `traceroute $input`; // sink
    echo $output;
}

function example5($input){
    $cmd = "tar -xf " . $input . " -C /var/www/uploads";
    passthru($cmd);                           // sink
}

class DiagnosticController {
    public function run() {
        $host = $_GET['host'];              // source
        $command = "ping -c 2 " . $host;
        return shell_exec($command);        // sink
    }
}

function example6(){
    $arg = $_GET['arg'];                        // source
    $descriptorspec = [
        0 => ["pipe", "r"],
        1 => ["pipe", "w"],
        2 => ["pipe", "w"]
    ];

    $command = "ls " . $arg;
    $process = proc_open($command, $descriptorspec, $pipes); // sink
}

function example7(){
    $filename = $_POST['name'];                 // source
    $handle = popen("tail -f /tmp/" . $filename, "r"); // sink
}

function example8($input){
    mail($to, $subject, $message, "", "-X/tmp/" . $input);
}

function example9(){
    # use Symfony\Component\Process\Process;

    $process = new Process("ls " . $_GET['dir']);
    $process->run();

    Process::run("ls " . $_GET['dir']);
}