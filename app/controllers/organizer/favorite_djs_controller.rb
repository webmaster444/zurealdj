class Organizer::FavoriteDjsController < Organizer::BaseController

  def update
    @dj = Dj.find params[:id]
    current_user.organizer.favorite_djs << @dj unless current_user.organizer.favorite_djs.include?(@dj)
    render json: {message: 'Dj added to favorites.'}
  end

  def destroy
    @dj = Dj.find params[:id]
    current_user.organizer.favorite_djs.delete(@dj) if current_user.organizer.favorite_djs.include?(@dj)
    render json: {message: 'Dj removed from favorites.'}
  end
end