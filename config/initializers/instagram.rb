require "instagram"
  Instagram.configure do |config|

    #need owners profile configuration
    config.client_id = "78f15a3e700f453a86001e712d79fd4a"
    config.access_token = "4878018022.78f15a3.7ca154946bb744ca9f499c02cc7c4cac"
    config.client_secret = "cc7467a962894b549d1c0bc4fe56a1bb"

    # to enable access
    # https://www.instagram.com/oauth/authorize?client_id=xxxxx&redirect_uri=http://localhost&scope=public_content+likes+comments+relationships&response_type=token

  end