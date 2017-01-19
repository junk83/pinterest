# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # 画像は300pxにリサイズ
  process :resize_to_limit => [300, 300]

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

  # ファイル名をuser_idに変更
  def filename
    if original_filename.present?
      "#{SecureRandom.uuid}" + '.jpg'
    end
  end

end
