
def example1()
    template = params[:template]        # source
    renderer = ERB.new(template)        # sink
    output = renderer.result(binding)
end


class DemoController < ApplicationController
    def example2
        render inline: params[:template]   # source + sink
    end

    def example3()
        render html: params[:template].html_safe   # source → sink
    end

    def example4()        
        template = params[:template]       # source
        engine = Haml::Engine.new(template) # sink
        engine.render
    end

    def example5()
        tpl = params[:tpl]            # source
        engine = Slim::Template.new { tpl }  # sink
        engine.render
    end
end

def example6()
    input = params[:template]     # source
    template = Tilt.new { input } # sink
    template.render
end

def example7()
    tpl = params[:tpl]             # source
    template = Liquid::Template.parse(tpl)  # sink
    template.render
end