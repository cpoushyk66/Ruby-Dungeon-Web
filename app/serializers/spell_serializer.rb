class SpellSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :mp_cost, :effect, :flavor_text, :school
end
