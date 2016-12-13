class CountryFlagsController < ApplicationController

  skip_before_filter :authenticate_user

  def index
    @flags = CountryFlag.all
  end
end