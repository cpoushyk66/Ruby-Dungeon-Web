class UserSimpleSerializer < ActiveModel::Serializer
    attributes :username, :image, :character_tokens
end