class Admin::OrganizersController < Admin::BaseController

  load_and_authorize_resource :organizer

  def index
    organizers = Organizer.arel_table

    query = organizers
            .project(Arel.star)
            .group(organizers[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(organizers[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(organizers[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @page = params[:page].to_i
    @page = 1 if @page < 1
    @per_page = params[:per_page].to_i
    @per_page = 10 if @per_page < 1

    @organizers = Organizer.find_by_sql(query.take(@per_page).skip((@page - 1) * @per_page).to_sql)
    @count = Organizer.find_by_sql(count_query.to_sql).count
  end

  def create
    @organizer = Organizer.new organizer_params

    if @organizer.save
      render json: { message: I18n.t('organizer.messages.success_upsert') }
    else
      render json: {errors: @organizer.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @organizer.update_attributes organizer_params
      render json: { message: I18n.t('organizer.messages.success_upsert') }
    else
      render json: { errors: @organizer.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @organizer.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def organizer_params
    params.require(:organizer).permit :first_name, :last_name, :city, :country_flag_code, :address, :about, :facebook_link,
                                      :instagram_link, :soundcloud_link
  end

end