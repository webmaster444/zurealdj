class OrganizationsController < ApplicationController

  load_and_authorize_resource :organization

  def index
    organizations = Organization.arel_table

    query = organizations
            .project(Arel.star)
            .group(organizations[:id])

    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
        query = query.order(organizations[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
        query = query.order(organizations[:id].desc)
    end

    count_query = query.clone.project('COUNT(*)')

    @organizations = Organization.find_by_sql(query.take(10).skip((params[:page].to_i - 1) * 10).to_sql)
    @count = Organization.find_by_sql(count_query.to_sql).count
  end

    def create
    @organization = Organization.new organization_params

    if @organization.save
      render json: { message: I18n.t('organization.messages.success_upsert') }
    else
      render json: {errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def update
    if @organization.update_attributes organization_params
      render json: { message: I18n.t('organization.messages.success_upsert') }
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @organization.destroy
    render json: {ok: true}
  end

  def show

  end

  # related models actions

  private 

  def organization_params
    params.require(:organization).permit!
  end

end