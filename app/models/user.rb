class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true
    validates :username, presence: true
    has_many :characters, dependent: :destroy

    def self.give_admin_access(admin, user)
        if (admin.admin)
            user.update(admin: true)
            true
        else
            false
        end
    end
end
