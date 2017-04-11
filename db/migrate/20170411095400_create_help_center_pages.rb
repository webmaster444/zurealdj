class CreateHelpCenterPages < ActiveRecord::Migration[5.0]
  def change
    create_table :help_center_pages do |t|
      t.text :content
      t.timestamps
    end
  end
end
