# EXAMPLE 1: simple eval
def eval_from_params(params)
  # ruleid: ruby-taint-000-code-injection
  result = eval(params[:expr])
  # ruleid: ruby-taint-000-code-injection
  result = eval params[:expr]
  # ruleid: ruby-taint-000-code-injection
  result = eval "10 + #{params[:expr]}"
end
  
# EXAMPLE 2: instance_eval executes code in object context
def instance_eval_from_body(request)
  obj = Object.new
  # ruleid: ruby-taint-000-code-injection
  obj.instance_eval(request.body.read)

  class UserProfile
    def update_attribute
      # ruleid: ruby-taint-000-code-injection
      instance_eval(params[:update_code])
    end
  end
end

# EXAMPLE 3: class_eval
def class_eval_from_json(params)
  # ruleid: ruby-taint-000-code-injection
  User.class_eval(params[:code])

  class UserProfile
    def update_attribute
      # ruleid: ruby-taint-000-code-injection
      class_eval(params[:update_code])
      # ruleid: ruby-taint-000-code-injection
      class_eval params[:update_code]
    end
    def self.add_method
      method_name = params[:method_name]
      method_body = params[:method_body]
      # ruleid: ruby-taint-000-code-injection
      class_eval <<-RUBY
        def #{method_name}
          #{method_body}
        end
      RUBY
    end
  end
end
  
# EXAMPLE 4: ERB.new
def erb_from_params(params)
  # ruleid: ruby-taint-000-code-injection
  renderer = ERB.new(params[:template])
  output = renderer.result(binding)
  output
end
  
# EXAMPLE 5: send will invoke arbitrary method on object
def send_from_params(params, user)
  method_to_call = params[:method]
  # ruleid: ruby-taint-000-code-injection
  user.send(method_to_call)

  class AdminPanel
    def process_action
      # Source: acción y argumentos del usuario
      action = params[:action]. # el usuario controla el metodo que se llama
      args = params[:args]      # el usuario controla los parametros que se usan
      
      # ruleid: ruby-taint-000-code-injection
      result = send(action, *args)
      render json: { result: result }
    end
    
    private
    def delete_all_users
      # si se utiliza como action destroy_all, se eliminan todos los usuarios
      User.destroy_all
    end
  end
end
  
# EXAMPLE 6: reflectively obtains method and calls it
def method_call_from_params(params, controller)
  action = params[:action]
  # ruleid: ruby-taint-000-code-injection
  controller.method(action).call
end

# EXAMPLE 10: load arbitrary ruby files
class PluginLoader
  def load_plugin
    # ruleid: ruby-taint-000-code-injection
    load "plugins/#{params[:plugin]}.rb"
    # ruleid: ruby-taint-000-code-injection
    load("plugins/#{params[:plugin]}.rb")
    
    # ruleid: ruby-taint-000-code-injection
    require params[:library]
    # ruleid: ruby-taint-000-code-injection
    require(params[:library])
  end
end
