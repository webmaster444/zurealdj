puts "Create users ..."

User.create email: 'admin@gmail.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.admin.id
User.create email: 'dj@gmail.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'organizer@gmail.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.organizer.id