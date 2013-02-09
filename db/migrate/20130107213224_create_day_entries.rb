class CreateDayEntries < ActiveRecord::Migration
  def change
    create_table :day_entries do |t|
      t.string :title
      t.text :story
      t.date :day

      t.timestamps
    end
  end
end
