require 'sidekiq/web'

Rails.application.routes.draw do

  resources :country_flags, only: [:index]

  mount ActionCable.server => '/cable'
  mount Sidekiq::Web, at: '/sidekiq'

  root to: 'pages#index'

  get '/admin', to: "pages#admin"
  get '/dj', to: "pages#dj"
  get '/organizer', to: "pages#organizer"
  get '/djs/:url', to: "pages#url"

  scope '(:locale)' do
    resources :country_flags, only: [:index]
    namespace :admin do
      resources :users, only: [] do
          collection do
            get :profile
            put :update
          end
      end
      resources :admins, except: [:edit, :new, :update, :show]
      resources :djs, only: [:index, :update, :destroy, :show]
      resources :bookings, only: [:index, :create, :update, :destroy, :show]
      resources :events, only: [:index, :destroy, :show]
      resources :genres, only: [:index, :create, :update, :destroy, :show]
      resources :event_categories, only: [:index, :create, :update, :destroy, :show]
      resources :equipments, only: [:index, :create, :update, :destroy, :show]
      resources :who_we_are_pages, only: [:update, :show]
      resources :crew_pages, only: [:update, :show]
      resources :how_we_work_pages, only: [:update, :show]
      resources :policies_pages, only: [:update, :show]
      resources :terms_n_conditions_pages, only: [:update, :show]
      resources :organizers, only: [:index, :update, :destroy, :show]
      resources :cancelations_pages, only: [:update, :show]
      resources :help_center_pages, only: [:index] do
        collection do
          put :update
        end
      end
      resources :contact_us_pages, only: [:index] do
        collection do
          put :update
        end
      end
      resources :course_pages, only: [:index] do
        collection do
          put :update
        end
      end
      resources :password_resets, only: [:create, :update, :show, :edit]
      resources :passwords, only: [:create]
      resources :about_slides, only: [:index, :create, :update, :destroy, :show]
      resources :email_sender, only: [:index, :create] do
        collection do
          get :show
          put :update
        end
      end
      resources :subscriptions, only: [:index, :show, :create, :update, :destroy] do
        collection do
          post :update_order
        end
      end
      resources :courses, only: [:index, :create, :update, :destroy, :show]
    end

    namespace :dj do
      get :profile, to: "users#profile"
      get :step_data, to: "users#step_data"
      resources :sessions, only: [] do
        collection do
          get :check
        end
      end
      resources :event_categories, only: [:index]
      resources :genres, only: [:index]
      resources :equipments, only: [:index]
      resources :users, only: [] do
        collection do
          post :step
          post :step_back
          post :update_profile
          get :comments
        end
      end
      resources :settings, only: [:index, :update] do
        collection do
          post :notifications
        end
      end
      resources :events, only: [:index, :show]
      resources :bookings, only: [:update]
      resources :chat_rooms, only: [:index]
      resources :messages, only: [:index, :update]
      resources :subscriptions, only: [:index, :create]
    end

    namespace :organizer do
      get :profile, to: "users#profile"
      get :step_data, to: "users#step_data"
      resources :sessions, only: [] do
        collection do
          get :check
        end
      end
      resources :event_categories, only: [:index]
      resources :genres, only: [:index]
      resources :equipments, only: [:index]
      resources :users, only: [] do
        collection do
          post :step
          post :step_back
          post :update_profile
        end
      end
      resources :djs, only: [:index, :show] do
        member do
          post :rate
        end
        collection do
          get :comments
        end
      end
      resources :favorite_djs, only: [:index, :update, :destroy]
      resources :events, only: [:index, :create, :show, :update, :destroy]
      get 'event_list', to: 'events#event_booking_list'
      resources :settings, only: [:index, :update] do
        collection do
          post :notifications
        end
      end
      resources :bookings, only: [:create, :destroy]
      resources :chat_rooms, only: [:index]
      resources :messages, only: [:index, :update]
      resources :subscriptions, only: [:index, :create]
    end

    resources :attachments, only: [] do
      collection do
        post '/:entity_type', to: 'attachments#create'
      end
    end

    resources :pages, only:[] do
       get :check_session
    end

    resources :sessions, only: [:create] do
      collection do
        post :facebook
        delete :destroy
        get :check
      end
    end

    resources :passwords, only: [:create]

    resources :password_resets, only: [:create, :update, :show]

    resources :email_sender, only: [:index, :create]

    resources :users, only: [:create] do
      collection do
        post :facebook
      end
      collection do
        post :email_available
        get :confirm_email
      end
    end

    resources :static_pages, only: [:show]

    resources :notifications, only: [:index, :update]
    resources :slides, only: [:index]
    resources :top_rated_djs, only: [:index]
    resources :courses, only: [:index]
    resources :instagram, only: [:index]
    resources :subscriptions, only: [:index]
  end
end
