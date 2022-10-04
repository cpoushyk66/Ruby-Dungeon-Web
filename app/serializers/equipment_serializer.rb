class EquipmentSerializer < ActiveModel::Serializer
  attributes :id, :equipment_type, :item_id
  has_one :wearer
end
