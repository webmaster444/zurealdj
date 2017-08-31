module ApplicationHelper
  def timeformat datetime
    hour = datetime.hour % 12 + (datetime.hour == 12? 12 : 0)

    "#{ hour < 10? '0' : '' }#{ hour }:#{ datetime.strftime('%M') } #{ datetime.hour >= 13? 'PM' : 'AM' }"
  end
end
