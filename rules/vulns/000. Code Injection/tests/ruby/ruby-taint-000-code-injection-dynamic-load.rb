# EXAMPLE 10: load arbitrary ruby files
class PluginLoader
  def load_plugin
    # ruleid: ruby-taint-000-code-injection-dynamic-load
    load "plugins/#{params[:plugin]}.rb"
    # ruleid: ruby-taint-000-code-injection-dynamic-load
    load("plugins/#{params[:plugin]}.rb")
    
    # ruleid: ruby-taint-000-code-injection-dynamic-load
    require params[:library]
    # ruleid: ruby-taint-000-code-injection-dynamic-load
    require(params[:library])
  end
end
