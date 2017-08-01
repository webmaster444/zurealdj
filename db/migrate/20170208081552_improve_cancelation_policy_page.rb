class ImproveCancelationPolicyPage < ActiveRecord::Migration[5.0]
  def change
    rename_table :cancellation_policies, :cancellation_policy_pages
  end
end
