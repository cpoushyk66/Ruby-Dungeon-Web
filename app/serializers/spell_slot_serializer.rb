class SpellSlotSerializer < ActiveModel::Serializer
  attributes :id, :spell_id
  has_one :caster
end
