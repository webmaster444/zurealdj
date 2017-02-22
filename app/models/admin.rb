class Admin < ActiveRecord::Base
  self.table_name = 'users'
  def self.search_query(params)
    params[:per_page] ||= 10
    admins = User.arel_table
    roles = Role.arel_table
    fields = [
        admins[:id],
        admins[:name],
        admins[:email]
    ]
    query = admins
                .project(fields)
                .group(fields)
                .join(roles).on(roles[:id].eq(admins[:role_id]))
                .where(roles[:name].eq(:admin))
    if !params[:sort_column].blank? && ['asc', 'desc'].include?(params[:sort_type])
      query = query.order(admins[params[:sort_column.to_sym]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      query = query.order(admins[:id].desc)
    end
    query.where(admins[:name].matches("%#{ params[:name] }%"))                             if params[:name].present?
    query.where(admins[:email].matches("%#{ params[:email] }%"))                           if params[:email].present?
    query
  end
end