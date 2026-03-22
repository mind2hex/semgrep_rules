# EXAMPLE 1: backticks WITH DIRECT INTERPOLATION
def process_file
  # ruleid: ruby-taint-404-command-injection
  data = `grep "#{params[:search_term]}" /var/log/app.log`
end
  
# EXAMPLE 2: %x notation con entrada del usuario
def analyze_logs
  # ruleid: ruby-taint-404-command-injection
  data = %x{ps aux | grep #{params[:process_name]}}

end
  
  # EXAMPLE 3: System() con strings interpolados
  class BackupService
    def create_backup
      # Source: nombre del backup del usuario
      backup_name = params[:backup_name]
      source_dir = params[:source]
      
      # ruleid: ruby-taint-404-command-injection
      success = system("tar -czf #{backup_name}.tar.gz #{source_dir}")
    end
  end
  
  # EXAMPLE 4: exec()
  class CommandRunner
    def run_command
      cmd = params[:command]
      args = params[:arguments]
      # ruleid: ruby-taint-404-command-injection
      exec("#{cmd} #{args}")
    end
  end
  
  # EXAMPLE 5: open with pipe mode
  class DataImporter
    def import_data
      # Source: comando del usuario
      import_cmd = params[:import_command]
      
      # ruleid: ruby-taint-404-command-injection
      file = open("|#{import_cmd}")
      data = file.read
      file.close
    end
  end
  
  
  # EXAMPLE 9: Open3
  require 'open3'
  
  class CommandExecutor
    def run_with_output
      # Source: comando del usuario
      cmd = params[:full_command]
      
      # ruleid: ruby-taint-404-command-injection
      stdout, stderr, status = Open3.capture3(cmd)
      
      # ruleid: ruby-taint-404-command-injection
      Open3.popen3("ffmpeg -i #{params[:input]} #{params[:output]}") do |stdin, stdout, stderr, thread|
        @output = stdout.read
      end
      
      # ruleid: ruby-taint-404-command-injection
      result = Open3.pipeline_r("cat #{params[:file]}", "grep #{params[:pattern]}", "sort")
      
      render json: { stdout: stdout, stderr: stderr }
    end
  end
  
  # EXAMPLE 10: pty
  require 'pty'
  
  class TerminalEmulator
    def create_session
      # Source: comando del usuario
      shell_command = params[:shell_command]
      
      # ruleid: ruby-taint-404-command-injection
      PTY.spawn(shell_command) do |stdout, stdin, pid|
        stdout.each { |line| puts line }
      end
    end
  end