def process_file
    # ruleid: ruby-taint-404-command-injection-open-call
    open("| #{params[:cmd]}")
  
      # ruleid: ruby-taint-404-command-injection-open-call
    open("|" + params[:cmd])
  
      # ruleid: ruby-taint-404-command-injection-open-call
    Kernel.open("| #{params[:cmd]}")
  
      # ruleid: ruby-taint-404-command-injection-open-call
    IO.read("| #{params[:cmd]}")
  end