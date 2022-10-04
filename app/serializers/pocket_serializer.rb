class PocketSerializer < ActiveModel::Serializer
  attributes :id, :item_id
  has_one :holder
end
