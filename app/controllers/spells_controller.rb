class SpellsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        spells = Spell.all
        render json: spells, status: :ok
    end

    def show
        spell = find_spell
        render json: spell, status: :ok

    end

    def create
        spell = Spell.create!(spell_params)
        render json: spell, status: :created
    end

    def update
        spell = find_spell
        spell.update!(spell_params)
        render json: spell, status: :accepted
    end

    def destroy
        spell = find_spell
        spell.destroy
        head :no_content
    end

    def template
        render json: Spell.template, status: :ok
    end
            
    private

    def find_spell
        Spell.find(params[:id])
    end

    def spell_params
        params.permit(:name, :value, :mp_cost, :effect, :flavor_text, :school)
    end

    def render_not_found_response
        render json: {error: "Spell not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end

end