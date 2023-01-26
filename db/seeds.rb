# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


#Users - Template

u1 = User.create(username: "charlottep", password: "test", admin: 3, character_tokens: 99, image: "https://pbs.twimg.com/profile_images/1592256182835724289/femZcIot_400x400.jpg")

#Items - Swords
wooden_sword = Item.create(
    name: "Wooden Sword",
    item_type: "Weapon Sword",
    bonus: 1,
    bonus_type: "BOOST Strength",
    value: 3,
    rarity: 1,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Training sword for young squires, children, or the poorest of hobos.",
    image: "./assets/images/wooden_sword.png",
)

iron_sword = Item.create(
    name: "Iron Sword",
    item_type: "Weapon Sword",
    bonus: 3,
    bonus_type: "BOOST Strength",
    value: 7,
    rarity: 2,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Standard sword for most town guards and beginner adventurers.",
    image: "./assets/images/iron_sword.png",
)

steel_sword = Item.create(
    name: "Steel Sword",
    item_type: "Weapon Sword",
    bonus: 5,
    bonus_type: "BOOST Strength",
    value: 12,
    rarity: 3,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Found on most city guards and private security.",
    image: "./assets/images/steel_sword.png",
)

mana_sword = Item.create(
    name: "Mana Sword",
    item_type: "Weapon Sword",
    bonus: 10,
    bonus_type: "BOOST Intelligence",
    value: 20,
    rarity: 5,
    class_restriction: "ONLY Wizard Sorcerer",
    sellable: true,
    flavor_text: "A truly rare sword that allows mages to channel the energy of old into one deadly, precise blade.",
    image: "./assets/images/mana_sword.png",
)

holy_sword = Item.create(
    name: "Holy Sword",
    item_type: "Weapon Sword",
    bonus: 12,
    bonus_type: "BOOST Strength",
    value: 25,
    rarity: 5,
    class_restriction: "ONLY Paladin",
    sellable: true,
    flavor_text: "Holy energy radiates from the heavens' blade, calming the mind and smiting the unworthy.",
    image: "./assets/images/holy_sword.png",
)

#Items - Helmets
leather_cap = Item.create(
    name: "Leather Cap",
    item_type: "Armor Helm",
    bonus: 1,
    bonus_type: "BOOST Armor",
    value: 3,
    rarity: 1,
    class_restriction: "ONLY Wizard Sorcerer Rogue Bard Warlock",
    sellable: true,
    flavor_text: "Serves as a very floppy bowl in case of emergency.",
    image: "./assets/images/leather_cap.png",
)

iron_helm = Item.create(
    name: "Iron Helm",
    item_type: "Armor Helm",
    bonus: 3,
    bonus_type: "BOOST Armor",
    value: 7,
    rarity: 2,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Standard issue helms across the kingdom, making it the leading cause of bad hair days.",
    image: "./assets/images/iron_helm.png",
)

wizard_hat = Item.create(
    name: "Wizard Hat",
    item_type: "Armor Helm",
    bonus: 3,
    bonus_type: "BOOST Intelligence",
    value: 7,
    rarity: 2,
    class_restriction: "ONLY Wizard Sorcerer",
    sellable: true,
    flavor_text: "One bell away from quite the festive hat.",
    image: "./assets/images/wizard_hat.png",
)

steel_helmet = Item.create(
    name: "Steel Helmet",
    item_type: "Armor Helm",
    bonus: 5,
    bonus_type: "BOOST Armor",
    value: 12,
    rarity: 3,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Top notch protection with a nice black sheen.",
    image: "./assets/images/steel_helmet.png",
)

#Items - Shields
wooden_shield = Item.create(
    name: "Wooden Shield",
    item_type: "Weapon Shield",
    bonus: 1,
    bonus_type: "BOOST Armor",
    value: 3,
    rarity: 1,
    class_restriction: "ONLY Warrior Paladin",
    sellable: true,
    flavor_text: "Also doubles as a plate on long journey's, just remember to clean it.",
    image: "./assets/images/wooden_shield.png",
)

#Items - Drop Specific
bone = Item.create(
    name: "Bone",
    item_type: "Drop",
    bonus: 0,
    bonus_type: "None",
    value: 2,
    rarity: 0,
    class_restriction: "All",
    sellable: true,
    flavor_text: "This could be from anything, hope it's not me.",
    image: "./assets/images/bone.png",
)

#Enemies - Undead
skeleton = Enemy.create(
    name: "Skeleton",
    race: "Undead",
    klass: "Warrior",
    level: 1,
    strength: 2,
    dexterity: 1,
    wisdom: 1,
    constitution: 1,
    charisma: 0,
    intelligence: 1,
    rarity: 0,
    gold: 1,
)

helm = skeleton.equipment.create(equipment_type: "Helm")
    helm.item_id = leather_cap.id
chest = skeleton.equipment.create(equipment_type: "Chestplate")
leggings = skeleton.equipment.create(equipment_type: "Legging")
boots = skeleton.equipment.create(equipment_type: "Boots")
main = skeleton.equipment.create(equipment_type: "Main Hand")
    main.item_id = wooden_sword.id
off = skeleton.equipment.create(equipment_type: "Off Hand")

#Drops
skeleton.pockets.create(item_id: bone.id)
skeleton.pockets.create(item_id: bone.id)
skeleton.pockets.create(item_id: bone.id)

skeleton_brute = Enemy.create(
    name: "Skeleton Brute",
    race: "Undead",
    klass: "Warrior",
    level: 2,
    strength: 4,
    dexterity: 1,
    wisdom: 1,
    constitution: 2,
    charisma: 0,
    intelligence: 1,
    rarity: 1,
    gold: 1,
)

helm = skeleton_brute.equipment.create(equipment_type: "Helm")
    helm.item_id = iron_helm.id
chest = skeleton_brute.equipment.create(equipment_type: "Chestplate")
leggings = skeleton_brute.equipment.create(equipment_type: "Legging")
boots = skeleton_brute.equipment.create(equipment_type: "Boots")
main = skeleton_brute.equipment.create(equipment_type: "Main Hand")
    main.item_id = iron_sword.id
off = skeleton_brute.equipment.create(equipment_type: "Off Hand")
    off.item_id = wooden_shield.id
#Drops
skeleton_brute.pockets.create(item_id: bone.id)
skeleton_brute.pockets.create(item_id: bone.id)
skeleton_brute.pockets.create(item_id: bone.id)

skeleton_mage = Enemy.create(
    name: "Skeleton Mage",
    race: "Undead",
    klass: "Sorcerer",
    level: 2,
    strength: 2,
    dexterity: 1,
    wisdom: 3,
    constitution: 2,
    charisma: 0,
    intelligence: 3,
    rarity: 1,
    gold: 1,
)

helm = skeleton_brute.equipment.create(equipment_type: "Helm")
    helm.item_id = wizard_hat.id
chest = skeleton_brute.equipment.create(equipment_type: "Chestplate")
leggings = skeleton_brute.equipment.create(equipment_type: "Legging")
boots = skeleton_brute.equipment.create(equipment_type: "Boots")
main = skeleton_brute.equipment.create(equipment_type: "Main Hand")
off = skeleton_brute.equipment.create(equipment_type: "Off Hand")
#Drops
skeleton_brute.pockets.create(item_id: bone.id)
skeleton_brute.pockets.create(item_id: bone.id)
skeleton_brute.pockets.create(item_id: bone.id)

