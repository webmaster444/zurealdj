puts "Create users ..."

User.create email: 'admin1@gmail.com', name: 'admin1', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.admin.id
User.create email: 'admin2@gmail.com', name: 'admin2', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.admin.id
User.create email: 'dj@gmail.com', name: 'dj1', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'dj2@gmail.com', name: 'dj2', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'dj3@gmail.com', name: 'dj3', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'dj4@gmail.com', name: 'dj4', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'dj5@gmail.com', name: 'dj5', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.dj.id
User.create email: 'organizer@gmail.com', name: 'org1', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.organizer.id