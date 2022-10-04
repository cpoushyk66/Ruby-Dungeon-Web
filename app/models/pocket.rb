class Pocket < ApplicationRecord

  belongs_to :holder, polymorphic: true
  belongs_to :item

end
