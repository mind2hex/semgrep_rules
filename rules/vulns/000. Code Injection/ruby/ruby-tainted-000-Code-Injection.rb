# EXAMPLE 1: simple eval
def eval_from_params(params)
    expr = params[:expr]
    # ruleid: ruby-000-Code-Injection
    result = eval(expr)
    result
  end
  
  # EXAMPLE 2: instance_eval executes code in object context
  def instance_eval_from_body(request)
    code = request.body.read
    obj = Object.new
    # ruleid: ruby-000-Code-Injection
    obj.instance_eval(code)
  end
  
  # EXAMPLE 3: class_eval
  require 'json'
  def class_eval_from_json(raw_body)
    payload = JSON.parse(raw_body)
    patch_code = payload["patch"]
    # ruleid: ruby-000-Code-Injection
    User.class_eval(patch_code)
  end
  
  # EXAMPLE 4: ERB.new
  require 'erb'
  def erb_from_params(params)
    tpl = params[:template]
    # ruleid: ruby-000-Code-Injection
    renderer = ERB.new(tpl)
    output = renderer.result(binding)
    output
  end
  
  # EXAMPLE 5: send will invoke arbitrary method on object
  def send_from_params(params, user)
    method_to_call = params[:method]
    # ruleid: ruby-000-Code-Injection
    user.send(method_to_call)
  end
  
  # EXAMPLE 6: reflectively obtains method and calls it
  def method_call_from_params(params, controller)
    action = params[:action]
    # ruleid: ruby-000-Code-Injection
    controller.method(action).call
  end
  
  # EXAMPLE 7: instance_eval inside object context
  class UserProfile
    attr_accessor :name, :email
    
    def update_attribute
      attribute_code = params[:update_code]
      # ruleid: ruby-000-Code-Injection
      instance_eval(attribute_code)
    end
  end
  
  # EXAMPLE 8: heredoc to class_eval
  class DynamicModel
    def self.add_method
      method_name = params[:method_name]
      method_body = params[:method_body]
      # todoruleid: ruby-000-Code-Injection
      class_eval <<-RUBY
        def #{method_name}
          #{method_body}
        end
      RUBY
    end
  end
  
  # EXAMPLE 9: send permite llamar cualquier método
  class AdminPanel
    def process_action
      # Source: acción y argumentos del usuario
      action = params[:action]
      args = params[:args]
      
      # ruleid: ruby-000-Code-Injection
      result = send(action, *args)
      render json: { result: result }
    end
    
    private
    def delete_all_users
      User.destroy_all
    end
  end
  
  # EXAMPLE 10: load arbitrary ruby files
  class PluginLoader
    def load_plugin
      # Source: nombre del plugin del usuario
      plugin_name = params[:plugin]
      
      # ruleid: ruby-000-Code-Injection
      load "plugins/#{plugin_name}.rb"
      
      # ruleid: ruby-000-Code-Injection
      require params[:library]
    end
  end
  
  # EXAMPLE 11: constantize convierte strings en clases
  class FactoryController
    def create_object
      # Source: tipo de clase del usuario
      class_name = params[:class_type]
      
      # Sink: constantize instancia cualquier clase
      klass = class_name.constantize
      # todoruleid: ruby-000-Code-Injection
      object = klass.new(params[:attributes])
      object.save
    end
  end