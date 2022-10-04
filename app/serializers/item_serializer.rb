class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :item_type, :bonus, :bonus_type, :value, :rarity, :class_restriction, :sellable, :flavor_text, :image
end
