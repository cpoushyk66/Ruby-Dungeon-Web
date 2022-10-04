class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin, :image, :character_tokens
end
