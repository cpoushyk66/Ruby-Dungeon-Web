class PocketsController < ApplicationController

    before_action :set_pocket, only: [:show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: Pocket.all, status: :ok
    end

    def show
        render json: @pocket, status: :ok
    end

    def create
        pocket = Pocket.create!(pocket_params)
        render json: pocket, status: :created
    end

    def update
        @pocket.update!(pocket_params)
        render json: @pocket, status: :accepted
    end

    def destroy
        @pocket.destroy
        head :no_content
    end
    private

    def set_pocket
        @pocket = Pocket.find(params[:id])
    end

    def pocket_params
        params.permit(:item_id, :holder_id, :holder_type)
    end

    def render_not_found_response
        render json: {error: "Pocket not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
