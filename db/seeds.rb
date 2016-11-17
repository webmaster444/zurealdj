puts "Create admin ..."
User.create email: 'admin@Zurealdj.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.admin.id