class SpellSlot < ApplicationRecord
  belongs_to :caster, polymorphic: true
  belongs_to :spell
end
