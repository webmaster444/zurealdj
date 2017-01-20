module PaperclipHelper
  def paperclip_url(paperclip_attachment, style = :original)
    if Paperclip::Attachment.default_options[:storage] == :azure
      paperclip_attachment.exists? ? paperclip_attachment.try(:azure_uri, style) : nil
    else
      request.base_url + paperclip_attachment.try(:url, style)
    end
  end
end