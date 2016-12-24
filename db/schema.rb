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

ActiveRecord::Schema.define(version: 20161224185443) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["event_id"], name: "index_bookings_on_event_id", using: :btree
    t.index ["user_id"], name: "index_bookings_on_user_id", using: :btree
  end

  create_table "cancelations", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cancelations_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cancelations_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "cancelation_id"
    t.index ["cancelation_id"], name: "index_cancelations_users_on_cancelation_id", using: :btree
    t.index ["user_id"], name: "index_cancelations_users_on_user_id", using: :btree
  end

  create_table "crew_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

  create_table "djs", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "city"
    t.string   "country_flag_code"
    t.text     "about"
    t.integer  "sample_id"
    t.string   "instagram_link"
    t.string   "facebook_link"
    t.string   "soundcloud_link"
    t.integer  "weekday_price_from"
    t.integer  "weekday_price_to"
    t.integer  "weekend_price_from"
    t.integer  "weekend_price_to"
    t.integer  "photo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["photo_id"], name: "index_djs_on_photo_id", using: :btree
    t.index ["sample_id"], name: "index_djs_on_sample_id", using: :btree
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
    t.index ["image_id"], name: "index_events_on_image_id", using: :btree
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

  create_table "organizers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "city"
    t.string   "country_flag_code"
    t.string   "address"
    t.text     "about"
    t.string   "instagram_link"
    t.string   "facebook_link"
    t.string   "soundcloud_link"
    t.datetime "created_at"
    t.datetime "updated_at"
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

  create_table "terms_n_conditions_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "email"
    t.string   "login"
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
    t.integer  "weekday_rate_from"
    t.integer  "weekday_rate_to"
    t.integer  "weekend_rate_from"
    t.integer  "weekend_rate_to"
    t.integer  "dj_step",              default: 0
    t.integer  "organizer_step",       default: 0
  end

  create_table "who_we_are_pages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country_flag_code"
  end

end
