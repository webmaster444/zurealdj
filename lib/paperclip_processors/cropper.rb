module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      target = @attachment.instance
      ["-crop", "#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}!"] + super
    end
  end
end