FactoryGirl.define do
  factory :fav_dj do
    dj_id 1
    organizer_id 1
    image_file_name "MyString"
    image_content_type "MyString"
    image_file_size 1
    image_update_at "2017-08-04 19:35:09"
    crop_x 1.5
    crop_y 1.5
    crop_w 1.5
    crop_h 1.5
    crop_rotate 1.5
    crop_scale_x 1.5
    crop_scale_y 1.5
  end
end
