class SpellSlotsController < ApplicationController
    
    before_action :set_spell_slot, only: [:show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: SpellSlot.all, status: :ok
    end

    def show
        render json: @spell_slot, status: :ok
    end

    def create
        spell_slot = SpellSlot.create!(spell_slot_params)
        render json: spell_slot, status: :created
    end

    def update
        @spell_slot.update!(spell_slot_params)
        render json: @spell_slot, status: :accepted
    end

    def destroy
        @spell_slot.destroy
        head :no_content
    end
    private

    def set_spell_slot
        @spell_slot = SpellSlot.find(params[:id])
    end

    def spell_slot_params
        params.permit(:spell_id, :caster_id, :caster_type)
    end

    def render_not_found_response
        render json: {error: "SpellSlot not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
