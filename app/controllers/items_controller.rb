class ItemsController < ApplicationController

    before_action :set_item, only: [:show, :patch_show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: Item.all, status: :ok
    end

    def show
        render json: @item, status: :ok
    end

    def patch_show
        render json: @item, serializer: ItemSimpleSerializer, status: :ok
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    end

    def update
        @item.update!(item_params)
        render json: @item, status: :accepted
    end

    def destroy
        @item.destroy
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

    def set_item
        @item = Item.find(params[:id])
    end

    def item_params
        params.permit(:name, :item_type, :image, :bonus, :bonus_type, :value, :rarity, :class_restriction, :sellable, :flavor_text)
    end

    def render_not_found_response
        render json: {error: "Item not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end

end