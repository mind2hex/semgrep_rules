class UsersController < ApplicationController

    def create
    # ruleid: ruby-taint-274-mass-assignment
      @user = User.new(params[:user])
      @user.save
    end
  
    def create
    # ruleid: ruby-taint-274-mass-assignment
      User.create(params[:user])
    end
  
    def create
      user_params = params[:user]
      # ruleid: ruby-taint-274-mass-assignment
      User.create(user_params)
    end
  
    def create
    # ruleid: ruby-taint-274-mass-assignment
      User.create(params[:user].merge(role: "member"))
    end
  
    def update
      @user = User.find(params[:id])
      # ruleid: ruby-taint-274-mass-assignment
      @user.update(params[:user])
    end
  
    def update
      @user = User.find(params[:id])
      # ruleid: ruby-taint-274-mass-assignment
      @user.assign_attributes(params[:user])
      @user.save
    end
  
    def update
    # ruleid: ruby-taint-274-mass-assignment
      @user.update_attributes(params[:user])
    end
  
  end
  
  
  class UsersController < ApplicationController
      def create
          # ok: ruby-taint-274-mass-assignment
          User.create(params.require(:user).permit(:name, :email))
      end
  end