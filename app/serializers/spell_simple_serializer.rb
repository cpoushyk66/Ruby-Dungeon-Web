class SpellSimpleSerializer < ActiveModel::Serializer
    attributes :name, :value, :mp_cost, :effect, :flavor_text, :school
  end
  