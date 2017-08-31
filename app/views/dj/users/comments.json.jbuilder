json.comments @comments.each do |comment|
  json.comment comment.comment
  json.rating comment.stars
  json.event_title comment.title
  json.created_at comment.created_at.strftime("%b %-d, %Y")
  
  user = User.find comment.user_id
  json.org_name user.name
  json.avatar paperclip_url(user.avatar, :small)
end
json.count @count