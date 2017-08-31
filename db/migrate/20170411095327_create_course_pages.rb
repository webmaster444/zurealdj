class CreateCoursePages < ActiveRecord::Migration[5.0]
  def change
    create_table :course_pages do |t|
      t.text :content
      t.timestamps
    end
  end
end
