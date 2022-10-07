class UsersController < ApplicationController

    before_action :set_user, only: [:patch_show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def patch_show
        render json: @user, serializer: UserSimpleSerializer, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    def destroy
        @user.destroy
        head :no_content
    end

    def give_admin_access
        admin = User.find(params[:admin_id])
        user = User.find(params[:user_id])
        if (User.give_admin_access(admin, user))
            render json: user, status: :accepted
        else
            render json: {error: "Unauthorized Action!"}, status: :unauthorized
        end
    end

    def template
        render json: User.template, status: :ok
    end
    
    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password, :image)
    end

    def render_not_found_response
        render json: {error: "User not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
