class DropCancellationPolicyPages < ActiveRecord::Migration[5.0]
  def change
    drop_table :cancellation_policy_pages
  end
end
