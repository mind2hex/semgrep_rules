# EXAMPLE 1: backticks WITH DIRECT INTERPOLATION
class FileProcessor
    def process_file
      filename = params[:filename]
      # ruleid: ruby-404-OS-Command-Injection
      data = `grep "#{params[:search_term]}" /var/log/app.log`
      render plain: result
    end
  end
  
  # EXAMPLE 2: %x notation con entrada del usuario
  class LogAnalyzer
    def analyze_logs
      pattern = params[:pattern]
      log_file = params[:log_file]
      
      # ruleid: ruby-404-OS-Command-Injection
      data = %x{ps aux | grep #{params[:process_name]}}
      
      render json: { output: result }
    end
  end
  
  # EXAMPLE 3: System() con strings interpolados
  class BackupService
    def create_backup
      # Source: nombre del backup del usuario
      backup_name = params[:backup_name]
      source_dir = params[:source]
      
      # ruleid: ruby-404-OS-Command-Injection
      success = system("tar -czf #{backup_name}.tar.gz #{source_dir}")
    end
  end
  
  # EXAMPLE 4: exec()
  class CommandRunner
    def run_command
      cmd = params[:command]
      args = params[:arguments]
      # ruleid: ruby-404-OS-Command-Injection
      exec("#{cmd} #{args}")
    end
  end
  
  # EXAMPLE 5: open with pipe mode
  class DataImporter
    def import_data
      # Source: comando del usuario
      import_cmd = params[:import_command]
      
      # ruleid: ruby-404-OS-Command-Injection
      file = open("|#{import_cmd}")
      data = file.read
      file.close
    end
  end
  
  # EXAMPLE 6: IO.popen() para comunicación bidireccional
  class ShellInterface
    def execute_interactive
      command = params[:command]
      # ruleid: ruby-404-OS-Command-Injection
      IO.popen(command, "r+") do |pipe|
        pipe.puts params[:input]
        pipe.close_write
        @output = pipe.read
      end
      
      render plain: @output
    end
  end
  
  # EXAMPLE 7: WITH SHELL INTERPOLATION
  class ProcessManager
    def start_process
      # Source: comando y argumentos del usuario
      cmd = params[:command]
      
      # ruleid: ruby-404-OS-Command-Injection
      pid = spawn(cmd)
      Process.detach(pid)
    end
  end
  
  # EXAMPLE 8: KERNEL.SEND WITH EXECUTION METHODS
  class DynamicExecutor
    def execute_method
      # Source: método y comando del usuario
      method_name = params[:method]
      command = params[:command]
      
      # Sink: send puede llamar métodos peligrosos
      if ['system', 'exec', '`'].include?(method_name)
          # ruleid: ruby-404-OS-Command-Injection
        result = Kernel.send(method_name.to_sym, command)
      end
      
      render plain: result.to_s
    end
  end
  
  # EXAMPLE 9: Open3
  require 'open3'
  
  class CommandExecutor
    def run_with_output
      # Source: comando del usuario
      cmd = params[:full_command]
      
      # ruleid: ruby-404-OS-Command-Injection
      stdout, stderr, status = Open3.capture3(cmd)
      
      # ruleid: ruby-404-OS-Command-Injection
      Open3.popen3("ffmpeg -i #{params[:input]} #{params[:output]}") do |stdin, stdout, stderr, thread|
        @output = stdout.read
      end
      
      # ruleid: ruby-404-OS-Command-Injection
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
      
      # ruleid: ruby-404-OS-Command-Injection
      PTY.spawn(shell_command) do |stdout, stdin, pid|
        stdout.each { |line| puts line }
      end
    end
  end