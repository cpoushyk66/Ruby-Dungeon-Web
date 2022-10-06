class Enemy < ApplicationRecord

    has_many :pockets, as: :holder, dependent: :destroy
    has_many :items, through: :pockets
    has_many :spell_slots, as: :caster, dependent: :destroy
    has_many :spells, through: :spell_slots
    has_many :equipment, as: :wearer, dependent: :destroy

    def self.get_enemies(num)
        Enemy.all.sample(num)
    end

    def self.template
        {
            name: "",
            race: "",
            klass: "",
            level: 1,
            strength: 1,
            dexterity: 1,
            wisdom: 1,
            constitution: 1,
            charisma: 1,
            intelligence: 1,
            rarity: 0,
            gold: 0
        }
    end


end
