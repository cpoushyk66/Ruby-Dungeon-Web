class ItemsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        items = Item.all
        render json: items, status: :ok
    end

    def show
        item = find_item
        render json: item, status: :ok
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    end

    def update
        item = find_item
        item.update!(item_params)
        render json: item, status: :accepted
    end

    def destroy
        item = find_item
        item.destroy
        head :no_content
    end

    def random
        items = Item.get_items(params[:num].to_i)
        render json: items, status: :ok
    end

    private

    def find_item
        Item.find(params[:id])
    end

    def item_params
        params.permit(:name, :item_type, :bonus, :bonus_type, :value, :rarity, :class_restriction, :sellable, :flavor_text)
    end

    def render_not_found_response
        render json: {error: "Item not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end

end