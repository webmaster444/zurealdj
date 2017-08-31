class RelatedRecords < ActiveRecord::Migration[5.0]
  def change
    add_reference :djs, :user
    add_reference :organizers, :user
  end
end
