class Dungeon < ApplicationRecord

    def self.generate_dungeon(num)


        x = 0
        y = 0
        dungeon = []
        num.times do
            column = []
            num.times do
                column << Dungeon.fill_room(x, y)
                y = y + 1
            end
            dungeon << column
            x = x + 1
            y = 0
        end
        
        {dungeon: dungeon, rooms: num * num}
    end

    def self.display(dungeon)

        dungeon.each do |row|

            print "X"
            row.each do |tile|
                print "|#{tile}|"
            end

            puts "X"
        end

    end

    def self.fill_room(x, y)

        chance = Random.rand(1..100)

        if chance <= 25
            {room_type: "item_room", coords: [x, y], visited: false, content: Random.rand(1..3), cleared: false}
        elsif chance <=60
            {room_type: "enemy_room", coords: [x, y], visited: false, content: Random.rand(1..3), cleared: false}
        elsif chance <= 80
            {room_type: "boss_room", coords: [x, y], visited: false, content: 1, cleared: false}
        else
            {room_type: "empty_room", coords: [x, y], content: 0, cleared: false}
        end
    end

    def self.get_leveled_enemies(amount, difficulty)
        Enemy.where("level <= ?", difficulty).sample(amount).uniq
    end
end