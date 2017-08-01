class Organizer::FavoriteDjsController < Organizer::BaseController

  def update
    @dj = Dj.find params[:id]
    if current_user.subscription.try(:org_can_add_dj_to_favorites)
      current_user.organizer.favorite_djs << @dj unless current_user.organizer.favorite_djs.include?(@dj)
      render json: {message: 'Dj added to favorites.'}
    else
      render json: {errors: ['Only subscribed users can add djs to favorites. Please subscribe.']}, status: :unprocessable_entity
    end
  end

  def destroy
    @dj = Dj.find params[:id]
    current_user.organizer.favorite_djs.delete(@dj) if current_user.organizer.favorite_djs.include?(@dj)
    render json: {message: 'Dj removed from favorites.'}
  end
end