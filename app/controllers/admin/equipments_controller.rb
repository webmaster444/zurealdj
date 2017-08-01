class Admin::EquipmentsController < ApplicationController

  load_and_authorize_resource :equipment

  def index
    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    respond_to do |f|
      f.json do
        query = Equipment.search_query(params)
        count_query = query.clone.project('COUNT(*)')

        @equipments = Equipment.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
        @count = Equipment.find_by_sql(count_query.to_sql).count
      end

      f.csv do
        headers["Content-Type"]        = "text/csv"
        headers["Content-disposition"] = "attachment; filename=equipments.csv"
        headers['Last-Modified']       = Time.now.ctime.to_s
        # headers['X-Accel-Buffering'] = 'no'
        # headers["Cache-Control"] ||= "no-cache"
        # headers["Content-Transfer-Encoding"] = "binary"

        self.response_body = EquipmentsStreamer.new(params)
      end
    end
  end

    def create
    @equipment = Equipment.new equipment_params

    if @equipment.save
      render json: { message: I18n.t('equipment.messages.success_upsert') }
    else
      render json: {errors: @equipment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @equipment.update_attributes equipment_params
      render json: { message: I18n.t('equipment.messages.success_upsert') }
    else
      render json: { errors: @equipment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @equipment.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def equipment_params
    params.require(:equipment).permit!
  end

end