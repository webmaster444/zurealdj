class AddSampleToDjs < ActiveRecord::Migration[5.0]
  def change
    add_attachment :djs, :sample
  end
end
