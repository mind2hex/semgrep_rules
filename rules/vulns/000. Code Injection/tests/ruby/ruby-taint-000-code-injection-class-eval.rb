def class_eval_from_json(params)
    # ruleid: ruby-taint-000-code-injection-class-eval
    User.class_eval(params[:code])
  
    class UserProfile
      def update_attribute
        # ruleid: ruby-taint-000-code-injection-class-eval
        class_eval(params[:update_code])
        # ruleid: ruby-taint-000-code-injection-class-eval
        class_eval params[:update_code]
      end
      def self.add_method
        method_name = params[:method_name]
        method_body = params[:method_body]
        # ruleid: ruby-taint-000-code-injection-class-eval
        class_eval <<-RUBY
          def #{method_name}
            #{method_body}
          end
        RUBY
      end
  
      # ruleid: ruby-taint-000-code-injection-class-eval
      MyClass.class_eval { params[:method_body] }
  
      # ruleid: ruby-taint-000-code-injection-class-eval
      MyClass.send(:class_eval, params[:method])
  
      # ruleid: ruby-taint-000-code-injection-class-eval
      MyClass.__send__(:class_eval, params[:method])
  
      # ruleid: ruby-taint-000-code-injection-class-eval
      MyClass.public_send(:class_eval, params[:method])
    end
  end