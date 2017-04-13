set :environment, 'development'
set :output, 'log/cron.log'

every 30.minutes do
  runner "SubscriptionWorker.perform_async()"
end