# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}"
    # /#{model.id}"
  end

  def cache_dir
    "uploads/tmp/pin"
  end

  # 画像は300pxにリサイズ
  process :resize_to_limit => [236, nil]

  # サムネイルを生成する設定
  version :thumb do
    process :resize_to_fill => [75, 75]
  end

  # アップロード出来るファイルを限定
  def extension_white_list
    %w(jpg jpeg gif png)
  end

  # 保存形式をjpgとする
   process :convert => 'jpg'

   def filename
     "#{secure_token}.#{file.extension}" if original_filename.present?
   end

   protected
   def secure_token
     var = :"@#{mounted_as}_secure_token"
     model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
   end

end
