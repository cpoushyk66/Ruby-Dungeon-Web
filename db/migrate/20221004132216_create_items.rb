class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string "name", null: false, default: "Item"
    t.string "item_type", null: false
    t.integer "bonus", default: 0, null: false
    t.string "bonus_type", null: false
    t.integer "value", default: 0, null: false
    t.integer "rarity", default: 0, null: false
    t.string "class_restriction", default: "ALL", null: false
    t.boolean "sellable", default: true, null: false
    t.string "flavor_text", default: "An item for sure!", null: false
    t.string "image", null: false

      t.timestamps
    end
  end
end
