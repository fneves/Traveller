class DayEntry < ActiveRecord::Base
  attr_accessible :day, :story, :title
  has_many :pictures, :as => :imageable
  belongs_to :user
end
