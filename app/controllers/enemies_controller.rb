class EnemiesController < ApplicationController

    before_action :set_enemy, only: [:show, :patch_show, :update, :destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        render json: Enemy.all, status: :ok
    end

    def show
        render json: @enemy, status: :ok
    end

    def patch_show
        render json: @enemy, serializer: EnemySimpleSerializer, status: :ok
    end

    def create
        enemy = Enemy.create!(enemy_params)
        render json: enemy, status: :created
    end

    def update
        @enemy.update!(enemy_params)
        render json: @enemy, status: :accepted
    end

    def destroy
        @enemy.destroy
        head :no_content
    end

    def random
        enemies = Enemy.get_enemies(params[:num].to_i)
        render json: enemies, status: :ok
    end

    def template
        render json: Enemy.template, status: :ok
    end

    private

    def set_enemy
        @enemy = Enemy.find(params[:id])
    end

    def enemy_params
        params.permit(:name, :race, :level, :klass, :strength, :dexterity, :intelligence, :wisdom, :charisma, :constitution, :gold, :rarity)
    end

    def render_not_found_response
        render json: {error: "Enemy not found"}, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
