class CharacterSimpleSerializer < ActiveModel::Serializer
    attributes :name, :title, :xp, :klass, :strength, :dexterity, :wisdom, :charisma, :intelligence, :constitution, :gold, :user_id, :level

end