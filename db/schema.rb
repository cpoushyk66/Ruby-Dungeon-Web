# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_04_134211) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "name", default: "Adventurer", null: false
    t.string "title", default: "Newbie", null: false
    t.string "klass", null: false
    t.integer "xp", default: 0, null: false
    t.integer "strength", default: 1, null: false
    t.integer "dexterity", default: 1, null: false
    t.integer "wisdom", default: 1, null: false
    t.integer "constitution", default: 1, null: false
    t.integer "intelligence", default: 1, null: false
    t.integer "charisma", default: 1, null: false
    t.integer "gold", default: 0, null: false
    t.integer "user_id", null: false
    t.integer "level", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "enemies", force: :cascade do |t|
    t.string "name", default: "Enemy", null: false
    t.string "race", default: "Baddie", null: false
    t.string "klass", null: false
    t.integer "level", default: 1, null: false
    t.integer "strength", default: 1, null: false
    t.integer "dexterity", default: 1, null: false
    t.integer "wisdom", default: 1, null: false
    t.integer "constitution", default: 1, null: false
    t.integer "charisma", default: 1, null: false
    t.integer "intelligence", default: 1, null: false
    t.integer "rarity", default: 0, null: false
    t.integer "gold", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "equipment", force: :cascade do |t|
    t.string "equipment_type"
    t.string "wearer_type"
    t.bigint "wearer_id"
    t.integer "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["wearer_type", "wearer_id"], name: "index_equipment_on_wearer"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", default: "Item", null: false
    t.string "item_type", null: false
    t.integer "bonus", default: 0, null: false
    t.string "bonus_type", null: false
    t.integer "value", default: 0, null: false
    t.integer "rarity", default: 0, null: false
    t.string "class_restriction", default: "ALL", null: false
    t.boolean "sellable", default: true, null: false
    t.string "flavor_text", default: "An item for sure!", null: false
    t.string "image", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pockets", force: :cascade do |t|
    t.integer "item_id"
    t.string "holder_type"
    t.bigint "holder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["holder_type", "holder_id"], name: "index_pockets_on_holder"
  end

  create_table "spell_slots", force: :cascade do |t|
    t.integer "spell_id"
    t.string "caster_type"
    t.bigint "caster_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["caster_type", "caster_id"], name: "index_spell_slots_on_caster"
  end

  create_table "spells", force: :cascade do |t|
    t.string "name", default: "Spell", null: false
    t.integer "value", default: 0, null: false
    t.integer "mp_cost", default: 0, null: false
    t.string "effect", default: "", null: false
    t.string "flavor_text", default: "That sure is an item!", null: false
    t.string "school", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "image", null: false
    t.integer "admin", default: 0, null: false
    t.integer "character_tokens", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
