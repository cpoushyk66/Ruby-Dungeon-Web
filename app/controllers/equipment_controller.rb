class EquipmentController < ApplicationController

    before_action :set_equipment, only: [:show, :patch_show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: Equipment.all, status: :ok
    end

    def show
        render json: @equipment, status: :ok
    end

    def patch_show
        render json: @equipment, serializer: EquipmentSimpleSerializer, status: :ok
    end

    def create
        equipment = Equipment.create!(equipment_params)
        render json: equipment, status: :created
    end

    def update
        @equipment.update!(equipment_params)
        render json: @equipment, status: :accepted
    end

    def destroy
        @equipment.destroy
        head :no_content
    end

    def random
        items = Item.get_items(params[:num].to_i)
        render json: items, status: :ok
    end

    def template
        render json: Item.template, status: :ok
    end

    private

    def set_equipment
        @equipment = Equipment.find(params[:id])
    end

    def equipment_params
        params.permit(:wearer_id, :wearer_type, :item_id)
    end

    def render_not_found_response
        render json: {error: "Equipment not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
