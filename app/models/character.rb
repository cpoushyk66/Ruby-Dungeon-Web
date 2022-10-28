class Character < ApplicationRecord

    belongs_to :user
    has_many :pockets, as: :holder, dependent: :destroy
    has_many :items, through: :pockets
    has_many :spell_slots, as: :caster, dependent: :destroy
    has_many :spells, through: :spell_slots
    has_many :equipment, as: :wearer, dependent: :destroy
    after_create :create_equipment


    def learn_spell(spell)
        if (self.spells.include?(spell))
            self.spellslots.create(spell_id: spell.id) 
        else
            puts "Already know spell!"
        end
    end

    def pick_up_item(item)
        self.pockets.create(item_id: item.id)
    end

    def buy_item(item)
        if (self.gold >= item.value)
            self.pick_up_item(item)
            self.update(gold: self.gold - item.value)
            true
        elsif (self.gold < item.value)
            puts "Too poor!"
            false
        end
    end

    def sell_item(item)
        pocket = self.pockets.find_by(item_id: item.id)
        if (pocket && item.sellable)
            pocket.destroy
            self.update(gold: self.gold + item.value)
            true
        else
            puts "Item not found"
            false
        end
    end     
    
    def level_up

        if (self.xp >= (self.level**2 + 20))
            self.update(xp: self.xp - (self.level**2 + 20), level: self.level + 1)
            true
        else
            false
        end
    end

    def create_equipment
        self.equipment.create(equipment_type: "Helm")
        self.equipment.create(equipment_type: "Chestplate")
        self.equipment.create(equipment_type: "Legging")
        self.equipment.create(equipment_type: "Boots")
        self.equipment.create(equipment_type: "Main Hand")
        self.equipment.create(equipment_type: "Off Hand")        
    end

    def equip_item(pocket)


        main_hand_types = ["Sword", "Club", "Wand", "Axe", "Bow"]
        off_hand_types = ["Shield"]
        item_type = pocket.item.item_type.split(" ")
        puts item_type
        if (item_type[0] == "Weapon")

            if main_hand_types.include?(item_type[1])
                self.equipment.find_by(equipment_type: "Main Hand").equip(pocket.item)
            elsif off_hand_types.include?(item_type[1])
                self.equipment.find_by(equipment_type: "Off Hand").equip(pocket.item)
            end

        elsif (item_type[0] == "Armor")

            case item_type[1]
            when "Helm"
                self.equipment.find_by(equipment_type: "Helm").equip(pocket.item)
            when "Chestplate"
                self.equipment.find_by(equipment_type: "Chestplate").equip(poket.item)
            when "Leggings"
                self.equipment.find_by(equipment_type: "Legging").equip(pocket.item)
            when "Boots"
                self.equipment.find_by(equipment_type: "Boots").equip(pocket.item)
            end

        end
    end

    def get_collective_item_spell_damage

        spell_damage = 0

        self.equipment.each do |equip|
            if (equip.item_id != nil)
                item = Item.find_by(id: equip.item_id)
                if item.stat_boost?("Intelligence")
                    spell_damage = spell_damage + item.bonus
                end
            end
        end

        spell_damage
    end

    def get_collective_item_attack_damage

        attack_damage = 0

        self.equipment.each do |equip|
            if (equip.item_id != nil)
                item = Item.find_by(id: equip.item_id)
                if item.stat_boost?("Strength") || item.stat_boost?("Dexterity")
                    attack_damage = attack_damage + item.bonus
                end
            end
        end

        attack_damage
    end

    def self.template
        {
            name: "",
            title: "",
            klass: "",
            level: 1,
            xp: 1,
            strength: 1,
            dexterity: 1,
            wisdom: 1,
            constitution: 1,
            charisma: 1,
            intelligence: 1,
            gold: 0,
            user_id: 0
        }
    end

end