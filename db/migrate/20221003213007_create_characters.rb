class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name, null: false, default: "Adventurer"
      t.string :title, default: "Newbie", null: false
      t.string :klass, null: false
      t.integer :xp, default: 0, null: false
      t.integer :strength, default: 1, null: false
      t.integer :dexterity, default: 1, null: false
      t.integer :wisdom, default: 1, null: false
      t.integer :constitution, default: 1, null: false
      t.integer :intelligence, default: 1, null: false
      t.integer :charisma, default: 1, null: false
      t.integer :gold, default: 0, null: false
      t.integer :user_id, null: false
      t.integer :level, default: 1, null: false

      t.timestamps
    end
  end
end
