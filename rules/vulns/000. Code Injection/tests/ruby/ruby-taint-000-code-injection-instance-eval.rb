# EXAMPLE 2: instance_eval executes code in object context
def instance_eval_from_body(request)
    obj = Object.new
    # ruleid: ruby-taint-000-code-injection-instance-eval
    obj.instance_eval(request.body.read)
  
    class UserProfile
      def update_attribute
        # ruleid: ruby-taint-000-code-injection-instance-eval
        instance_eval(params[:update_code])
      end
    end
  end