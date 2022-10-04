class CreateEquipment < ActiveRecord::Migration[7.0]
  def change
    create_table :equipment do |t|
      t.string :equipment_type
      t.references :wearer, polymorphic: true, index: true
      t.integer :item_id

      t.timestamps
    end
  end
end
