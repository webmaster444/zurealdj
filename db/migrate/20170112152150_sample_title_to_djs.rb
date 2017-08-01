class SampleTitleToDjs < ActiveRecord::Migration[5.0]
  def change
    add_column :djs, :sample_title, :string
  end
end
