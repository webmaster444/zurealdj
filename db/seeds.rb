puts "Create users ..."

User.create email: 'admin1@gmail.com', name: 'admin1', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.admin.id
User.create email: 'admin2@gmail.com', name: 'admin2', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.admin.id
User.create email: 'dj@gmail.com', name: 'dj1name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.dj.id
User.create email: 'dj2@gmail.com', name: 'dj2name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.dj.id
User.create email: 'dj3@gmail.com', name: 'dj3name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.dj.id
User.create email: 'dj4@gmail.com', name: 'dj4name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.dj.id
User.create email: 'dj5@gmail.com', name: 'dj5name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.dj.id
User.create email: 'organizer@gmail.com', name: 'org1name', password: '1234567890', password_confirmation: '1234567890', confirmed: true, role_id: Role.organizer.id