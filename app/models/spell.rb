class Spell < ApplicationRecord
    has_many :spell_slots, dependent: :destroy
    has_many :characters, through: :spell_slots
    has_many :enemies, through: :spell_slots

    def self.template
        {
            name: "",
            value: 0,
            mp_cost: 0,
            effect: "",
            flavor_text: "",
            school: ""
        }
    end
end
