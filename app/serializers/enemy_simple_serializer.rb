class EnemySimpleSerializer < ActiveModel::Serializer
    attributes :name, :race, :klass, :strength, :dexterity, :wisdom, :charisma, :intelligence, :constitution, :gold, :level
end