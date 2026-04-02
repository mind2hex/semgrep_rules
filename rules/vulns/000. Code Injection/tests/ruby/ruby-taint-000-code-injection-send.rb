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
    