class CreateEnemies < ActiveRecord::Migration[7.0]
  def change
    create_table :enemies do |t|
      t.string :name, default: "Enemy", null: false
      t.string :race, default: "Baddie", null: false
      t.string :klass, null: false
      t.integer :level, default: 1, null: false
      t.integer :strength, default: 1, null: false
      t.integer :dexterity, default: 1, null: false
      t.integer :wisdom, default: 1, null: false
      t.integer :constitution, default: 1, null: false
      t.integer :charisma, default: 1, null: false
      t.integer :intelligence, default: 1, null: false
      t.integer :rarity, default: 0, null: false
      t.integer :gold, default: 0, null: false

      t.timestamps
    end
  end
end
