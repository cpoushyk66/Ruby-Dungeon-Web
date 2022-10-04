class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :image, null: false
      t.integer :admin, null: false, default: 0
      t.integer :character_tokens, null: false, default: 0

      t.timestamps
    end
  end
end
