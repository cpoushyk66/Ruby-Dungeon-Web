class CreateSpellSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :spell_slots do |t|
      t.integer :spell_id
      t.references :caster, polymorphic: true, index: true

      t.timestamps
    end
  end
end
