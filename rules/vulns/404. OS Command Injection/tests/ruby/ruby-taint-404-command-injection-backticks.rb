def process_file
    # ruleid: ruby-taint-404-command-injection-backticks
    data = `grep "#{params[:search_term]}" /var/log/app.log`

    # ruleid: ruby-taint-404-command-injection-backticks
    %x(#{params[:cmd]})

    # ruleid: ruby-taint-404-command-injection-backticks
    data = %x{ps aux | grep #{params[:process_name]}}
end