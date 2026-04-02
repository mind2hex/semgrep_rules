# EXAMPLE 1: simple eval
def eval_from_params(params)
    # ruleid: ruby-taint-000-code-injection-eval
    result = eval(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    result = eval params[:expr]
    # ruleid: ruby-taint-000-code-injection-eval
    result = eval "10 + #{params[:expr]}"
    # ruleid: ruby-taint-000-code-injection-eval
    result = Kernel.eval(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    ::Kernel.eval(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    self.eval(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    binding.eval(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    method(:eval).call(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    Kernel.method(:eval).call(params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    public_send(:eval, params[:expr])
    # ruleid: ruby-taint-000-code-injection-eval
    __send__(:eval, params[:expr])
end

