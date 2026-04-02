
def example1()
    path = params[:file]          # source
    content = File.read(path)     # sink
    puts content
end

def example2()
    path = params[:path]              # source
    data = File.open(path, "r", &:read) # sink
end

def example3()
    filename = params[:name]     # source
    body = IO.read(filename)     # sink
end

def example4()
    path = params[:file]         # source
    data = open(path).read       # sink
end

class DownloadsController < ApplicationController
  def show
    path = params[:path]     # source
    send_file path           # sink
  end
end

def example6()
    path = params[:file]           # source
    content = Pathname.new(path).read  # sink
end

def example7()
    config_path = params[:config]     # source
    config = YAML.load_file(config_path)  # sink
end

def example8()
    script = params[:script]   # source
    load script                # sink
end

def example9()
    lib = params[:lib]   # source
    require lib          # sink
end

def example10()
    name = params[:name]           # source
    require_relative "../#{name}"  # sink
end

def example11()
    url = params[:url]           # source
    content = URI.open(url).read # sink
end

def example12()
    url = params[:url]                    # source
    body = OpenURI.open_uri(url).read     # sink
end

def example13()
    url = params[:url]               # source
    uri = URI.parse(url)
    body = Net::HTTP.get(uri)        # sink
end