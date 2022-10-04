class Equipment < ApplicationRecord

  belongs_to :wearer, polymorphic: true

  def equip(pocket)
              
      restriction_split = pocket.item.class_restriction.split(" ")
              
      case restriction_split[0]
      when "ALL"
          self.update(pocket_id: pocket.id)
      when "ONLY"
          if restriction_split[1..(restriction_split.length-1)].include?(self.wearer.klass)
              self.update(pocket_id: pocket.id)
          else
              false
          end
      else
          false
      end
  end

  def unequip
      self.update(pocket_id: nil)
  end
end
