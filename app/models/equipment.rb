class Equipment < ApplicationRecord

  belongs_to :wearer, polymorphic: true
  has_one :item

  def equip(item)
              
      item.class_restriction.split(" ")
              
      case restriction_split[0]
      when "ALL"
          self.update(item_id: item.id)
      when "ONLY"
          if restriction_split[1..(restriction_split.length-1)].include?(self.wearer.klass)
              self.update(item_id: item.id)
          else
              false
          end
      else
          false
      end
  end

  def unequip
      self.update(item_id: nil)
  end
end
