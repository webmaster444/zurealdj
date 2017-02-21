class CountryFlagsController < ApplicationController

  skip_before_action :authenticate_user

  def index
    @flags = CountryFlag.all
  end
end