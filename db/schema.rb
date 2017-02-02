# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170202112703) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "about_slides", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "attachments", force: :cascade do |t|
    t.integer  "entity_id"
    t.string   "entity_type"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer  "dj_id"
    t.integer  "event_id"
    t.datetime "from_date"
    t.datetime "to_date"
    t.integer  "rate"
    t.boolean  "status",    default: false
    t.index ["dj_id"], name: "index_bookings_on_dj_id", using: :btree
    t.index ["event_id"], name: "index_bookings_on_event_id", using: :btree
  end

  create_table "cancelations_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cancellation_policies", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "crew_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

  create_table "djs", force: :cascade do |t|
    t.string   "city"
    t.string   "country_flag_code"
    t.integer  "sample_id"
    t.integer  "photo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "sample_file_name"
    t.string   "sample_content_type"
    t.integer  "sample_file_size"
    t.datetime "sample_updated_at"
    t.string   "sample_title"
    t.integer  "rate_per_hour"
    t.index ["photo_id"], name: "index_djs_on_photo_id", using: :btree
    t.index ["sample_id"], name: "index_djs_on_sample_id", using: :btree
    t.index ["user_id"], name: "index_djs_on_user_id", using: :btree
  end

  create_table "email_senders", force: :cascade do |t|
    t.string  "address"
    t.string  "port"
    t.string  "domain"
    t.string  "authentication"
    t.string  "user_name"
    t.string  "password"
    t.boolean "enable_starttls_auto"
  end

  create_table "equipment", force: :cascade do |t|
    t.integer  "icon_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "icon_file_name"
    t.string   "icon_content_type"
    t.integer  "icon_file_size"
    t.datetime "icon_updated_at"
    t.index ["icon_id"], name: "index_equipment_on_icon_id", using: :btree
  end

  create_table "equipment_users", force: :cascade do |t|
    t.integer "equipment_id"
    t.integer "user_id"
    t.index ["equipment_id"], name: "index_equipment_users_on_equipment_id", using: :btree
    t.index ["user_id"], name: "index_equipment_users_on_user_id", using: :btree
  end

  create_table "event_categories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "event_categories_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_category_id"
    t.index ["event_category_id"], name: "index_event_categories_users_on_event_category_id", using: :btree
    t.index ["user_id"], name: "index_event_categories_users_on_user_id", using: :btree
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.string   "city"
    t.string   "country_flag_code"
    t.string   "address"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "image_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "organizer_id"
    t.index ["image_id"], name: "index_events_on_image_id", using: :btree
    t.index ["organizer_id"], name: "index_events_on_organizer_id", using: :btree
  end

  create_table "favorite_djs", force: :cascade do |t|
    t.integer "dj_id"
    t.integer "organizer_id"
    t.index ["dj_id"], name: "index_favorite_djs_on_dj_id", using: :btree
    t.index ["organizer_id"], name: "index_favorite_djs_on_organizer_id", using: :btree
  end

  create_table "genres", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "genres_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "genre_id"
    t.index ["genre_id"], name: "index_genres_users_on_genre_id", using: :btree
    t.index ["user_id"], name: "index_genres_users_on_user_id", using: :btree
  end

  create_table "how_we_work_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "booking_id"
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.text     "body"
    t.boolean  "read",         default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["booking_id"], name: "index_messages_on_booking_id", using: :btree
    t.index ["event_id"], name: "index_messages_on_event_id", using: :btree
    t.index ["from_user_id"], name: "index_messages_on_from_user_id", using: :btree
    t.index ["to_user_id"], name: "index_messages_on_to_user_id", using: :btree
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "to_user_id"
    t.integer  "from_user_id"
    t.integer  "notification_type"
    t.boolean  "read"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "event_id"
    t.integer  "star_id"
    t.index ["event_id"], name: "index_notifications_on_event_id", using: :btree
    t.index ["from_user_id"], name: "index_notifications_on_from_user_id", using: :btree
    t.index ["star_id"], name: "index_notifications_on_star_id", using: :btree
    t.index ["to_user_id"], name: "index_notifications_on_to_user_id", using: :btree
  end

  create_table "organizers", force: :cascade do |t|
    t.string   "city"
    t.string   "country_flag_code"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.index ["user_id"], name: "index_organizers_on_user_id", using: :btree
  end

  create_table "policies_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "token"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "stars", force: :cascade do |t|
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.integer  "stars",        default: 0
    t.datetime "created_at"
    t.index ["from_user_id"], name: "index_stars_on_from_user_id", using: :btree
    t.index ["to_user_id"], name: "index_stars_on_to_user_id", using: :btree
  end

  create_table "terms_n_conditions_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "email"
    t.boolean  "confirmed"
    t.string   "confirmation_token"
    t.integer  "role_id"
    t.string   "reset_password_token"
    t.string   "name"
    t.string   "facebook_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "personal_url"
    t.integer  "dj_step",              default: 0
    t.integer  "organizer_step",       default: 0
    t.string   "company_name"
    t.text     "about"
    t.float    "crop_x"
    t.float    "crop_y"
    t.float    "crop_w"
    t.float    "crop_h"
    t.float    "crop_rotate"
    t.float    "crop_scale_x"
    t.float    "crop_scale_y"
    t.boolean  "notifications",        default: true
  end

  create_table "who_we_are_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

end
