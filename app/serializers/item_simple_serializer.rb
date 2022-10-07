class ItemSimpleSerializer < ActiveModel::Serializer
    attributes :name, :item_type, :bonus, :bonus_type, :value, :rarity, :class_restriction, :sellable, :flavor_text, :image
  end
  