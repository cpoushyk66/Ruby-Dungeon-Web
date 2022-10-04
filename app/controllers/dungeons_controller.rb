class DungeonsController < ApplicationController

    def generate_dungeon
        dungeon = Dungeon.generate_dungeon(params[:num].to_i)
        render json: dungeon
    end

    def get_leveled_enemies
        render json: Dungeon.get_leveled_enemies(params[:amount].to_i, params[:difficulty].to_i), each_serializer: EnemySerializer, status: :ok
    end

end
