# EXAMPLE 4: ERB.new
def erb_from_params(params)
    # ruleid: ruby-taint-000-code-injection-erb
    renderer = ERB.new(params[:template])
    output = renderer.result(binding)
    output
  end