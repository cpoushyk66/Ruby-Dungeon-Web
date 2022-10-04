class Item < ApplicationRecord

    has_many :pockets, dependent: :destroy
    has_many :characters, through: :pockets
    has_many :enemies, through: :pockets
    belongs_to :equipment, optional: true
    before_destroy :nil_equipment
    
    def self.get_items(num)
        Item.all.sample(num).uniq
    end

    def stat_boost?(stat)
       bonus_split = self.bonus_type.split(" ")
       bonus_split[0] == "BOOST" && bonus_split[1..(bonus_split.length - 1)].include?(stat)
    end

    def nil_equipment
        check = Equipment.find_by(item_id: self.id)
        if (check)
            check.unequip
        end
    end

end
