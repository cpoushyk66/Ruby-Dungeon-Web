class CreatePockets < ActiveRecord::Migration[7.0]
  def change
    create_table :pockets do |t|
      t.integer :item_id
      t.references :holder, polymorphic: true, index: true
      t.timestamps
    end
  end
end
