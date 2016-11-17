class EquipmentsController < ApplicationController

  load_and_authorize_resource :equipment

  def index
    equipments = Equipment.arel_table

    query = equipments
            .project(Arel.star)
            .group(equipments[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(equipments[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(equipments[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @equipments = Equipment.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Equipment.find_by_sql(count_query.to_sql).count
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