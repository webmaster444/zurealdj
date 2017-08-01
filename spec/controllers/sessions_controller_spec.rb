require 'rails_helper'
include SessionsHelper


RSpec.describe SessionsController, type: :controller do

  describe '#destroy' do
    it 'should log out user' do

      user = create :user, :dj
       sign_in user

       delete :destroy

       expect(response.status).to be 200
       expect(user.sessions.count).to eq(0)
    end

     it 'should return error if there is no user' do
       delete :destroy

       expect(response.status).to be 401
     end
  end

  describe '#create' do
    it 'should log in user' do
       # user = create :user, password: '1234567890', password_confirmation: '1234567890'
       user = create :user, :dj

       process :create, method: :post, params: { email: user.email, password: '1234567890' }
       assert_response :success

       expect(response.status).to be 200
       response_body = JSON.parse response.body
       expect(response_body["session_token"]).to_not be_nil
       expect(user.sessions.count).to eq(1)
    end

    it 'should return error if wrong password submitted' do
      # user = create :user, password: 'wrongpass', password_confirmation: 'wrongpass'
      user = create :user, :dj

      # post :create, email: user.email, password: 'wrong'
      process :create, method: :post, params: { email: user.email, password: 'wrongpass' }
      assert_response 422

      expect(response.status).to be 422
      response_body = JSON.parse response.body
      expect(response_body["errors"]).to eq(["Wrong email/password combination."])
      expect(user.sessions.count).to eq(0)
    end

    it 'should return error if user does not exist' do

      # post :create, email: 'user@example.com', password: 'secret'
      process :create, method: :post, params: { email: 'wronguser@example.com', password: '1234567890' }
      assert_response 422

      expect(response.status).to be 422
      response_body = JSON.parse response.body
      expect(response_body["errors"]).to eq(["Wrong email/password combination."])
      expect(Session.count).to eq(0)
    end


  end

end