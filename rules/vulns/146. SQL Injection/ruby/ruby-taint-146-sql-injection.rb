class UsersController < ApplicationController
    def index
      q = params[:email]              # source
      # ruleid: ruby-taint-146-sql-injection
      @users = User.where("email = '#{q}'")  # sink
    end
  
    def search
      email = params[:email]          # source
      # ruleid: ruby-taint-146-sql-injection
      clause = "email = '#{email}'"   # propagator
      @users = User.where(clause)     # sink
    end
  
    def show
      id = params[:id]                         # source
      # ruleid: ruby-taint-146-sql-injection
      sql = "SELECT * FROM users WHERE id = " + id  # propagator
      result = ActiveRecord::Base.connection.execute(sql) # sink
    end
  
    def by_status
      status = params[:status]  # source
      # ruleid: ruby-taint-146-sql-injection
      rows = Report.find_by_sql("SELECT * FROM reports WHERE status = '#{status}'") # sink
      render json: rows
    end
  
    def search
      body = JSON.parse(request.body.read)
      term = body["term"]  # source
      # ruleid: ruby-taint-146-sql-injection
      sql = "SELECT * FROM products WHERE name LIKE '%#{term}%'" # propagator
      rows = ActiveRecord::Base.connection.exec_query(sql) # sink
      render json: rows
    end
  end
  
  get "/users" do
    name = params["name"] # source
    # ruleid: ruby-taint-146-sql-injection
    DB.run("SELECT * FROM users WHERE name = '#{name}'") # sink
  end
  
  def find_user(client, input)
    # ruleid: ruby-taint-146-sql-injection
    statement = "SELECT * FROM users WHERE email = '#{input}'" # propagator
    client.query(statement) # sink
  end
  
  class SessionsController < ApplicationController
    def audit
      role = cookies[:role] # source
      # ruleid: ruby-taint-146-sql-injection
      records = AuditLog.where("role = '#{role}'") # sink
      render json: records
    end
  end
  
  class MetricsController < ApplicationController
    def index
      tenant = request.headers["X-Tenant"] # source
      # ruleid: ruby-taint-146-sql-injection
      sql = "SELECT * FROM metrics WHERE tenant = '#{tenant}'"
      rows = ActiveRecord::Base.connection.execute(sql) # sink
      render json: rows
    end
  end
  
  class UsersController < ApplicationController
    def index
      term = current_filter   # source indirecto
      # ruleid: ruby-taint-146-sql-injection
      User.where("name LIKE '%#{term}%'") # sink
    end
  
    private
  
    def current_filter
      params[:filter]
    end
  end