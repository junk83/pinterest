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

ActiveRecord::Schema.define(version: 20170215072442) do

  create_table "boards", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                      null: false
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_boards_on_user_id", using: :btree
  end

  create_table "boards_pins", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "board_id"
    t.integer  "pin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_boards_pins_on_board_id", using: :btree
    t.index ["pin_id"], name: "index_boards_pins_on_pin_id", using: :btree
  end

  create_table "boards_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "board_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_boards_users_on_board_id", using: :btree
    t.index ["user_id"], name: "index_boards_users_on_user_id", using: :btree
  end

  create_table "follow_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "follower_id"
    t.integer  "following_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["follower_id", "following_id"], name: "index_follow_users_on_follower_id_and_following_id", unique: true, using: :btree
    t.index ["follower_id"], name: "index_follow_users_on_follower_id", using: :btree
    t.index ["following_id"], name: "index_follow_users_on_following_id", using: :btree
  end

  create_table "pinings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "pin_id"
    t.integer  "board_id"
    t.integer  "user_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.text     "description", limit: 65535
    t.index ["board_id"], name: "index_pinings_on_board_id", using: :btree
    t.index ["pin_id"], name: "index_pinings_on_pin_id", using: :btree
    t.index ["user_id"], name: "index_pinings_on_user_id", using: :btree
  end

  create_table "pins", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "image",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email",                                default: "", null: false
    t.string   "encrypted_password",                   default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "first_name",                                        null: false
    t.string   "last_name"
    t.integer  "age"
    t.string   "user_name",                                         null: false
    t.string   "gender",                                            null: false
    t.string   "uid"
    t.string   "provider"
    t.string   "image"
    t.text     "about",                  limit: 65535
    t.string   "location"
    t.string   "website_url"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["user_name"], name: "index_users_on_user_name", unique: true, using: :btree
  end

  add_foreign_key "boards", "users"
  add_foreign_key "boards_pins", "boards"
  add_foreign_key "boards_pins", "pins"
  add_foreign_key "boards_users", "boards"
  add_foreign_key "boards_users", "users"
  add_foreign_key "pinings", "boards"
  add_foreign_key "pinings", "pins"
  add_foreign_key "pinings", "users"
end
