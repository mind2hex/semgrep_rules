// EXAMPLE 1: Direct Concatenation
public void RunDiagnostics(string ipAddress){
    // ruleid: csharp-404-OS-Command-Injection
    Process.Start("cmd.exe", "/c ping " + ipAddress);
}

// EXAMPLE 2: String interpolation
public void CompressFile(string filePath){
    string command = $"7z a archive.zip {filePath}";
    // ruleid: csharp-404-OS-Command-Injection
    Process.Start("cmd.exe", $"/c {command}");
}

// EXAMPLE 3: ProcessStartInfo
public void BackupFile(string fileName){
    ProcessStartInfo psi = new ProcessStartInfo();
    psi.FileName = "cmd.exe";
    // ruleid: csharp-404-OS-Command-Injection
    psi.Arguments = "/c copy " + fileName + " backup\\";
    // ruleid: csharp-404-OS-Command-Injection
    Process.Start(psi);
}

// EXAMPLE 3: ProcessStartInfo
public void ExecuteSystemCommand(string userInput){
    using (Process process = new Process()){
        process.StartInfo.FileName = "powershell.exe";
        // ruleid: csharp-404-OS-Command-Injection
        process.StartInfo.Arguments = "-Command " + userInput;
        process.StartInfo.UseShellExecute = false;
        process.Start();
    }
}

// EXAMPLE 4: xp_cmdshell with SQL Server
public void BackupDatabase(string backupPath){
    // ruleid: csharp-404-OS-Command-Injection
    string query = "EXEC xp_cmdshell 'backup.bat " + backupPath + "'";
    using (SqlCommand cmd = new SqlCommand(query, connection))
    {
        cmd.ExecuteNonQuery();
    }
}

// EXAMPLE 5: Scripts with parameters
public void RunAnalysis(string logFile){
    ProcessStartInfo psi = new ProcessStartInfo
    {
        FileName = "analyze.bat",
        Arguments = logFile,  // Sin validación
        UseShellExecute = true
    };
    // ruleid: csharp-404-OS-Command-Injection
    Process.Start(psi);
}

// EXAMPLE 6: Process.Start directo
public void PingHost(string host){
    // ruleid: csharp-404-OS-Command-Injection
    System.Diagnostics.Process.Start("cmd.exe", "/c dir " + host);
}

// EXAMPLE 7: Process.Start directo
public void RunPowerShell(string script){
    using (var ps = System.Management.Automation.PowerShell.Create()){
        // ruleid: csharp-404-OS-Command-Injection
        ps.AddScript(script);  // Inyección directa
        ps.Invoke();
    }
}

// EXAMPLE 8: COMMAND CHAIN
public void RunPowerShellChain(string cmd1, string cmd2){
    // ruleid: csharp-404-OS-Command-Injection
    System.Management.Automation.PowerShell.Create()
        .AddScript("Get-Process")
        .AddCommand(cmd1)  // Inyección
        .AddCommand(cmd2)
        .Invoke();
}

// EXAMPLE 9: RunspaceInvoke
public void RunspaceCommand(string command){
    RunspaceInvoke invoker = new RunspaceInvoke();
    // ruleid: csharp-404-OS-Command-Injection
    invoker.Invoke(command);  // Inyección directa
}