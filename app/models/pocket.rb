class Pocket < ApplicationRecord

  belongs_to :holder, polymorphic: true
  belongs_to :item
  def nil_equipment
      check = Equipment.find_by(pocket_id: self.id)
      if (check)
          check.unequip
      end
  end

end
