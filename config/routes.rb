Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'

  get '/admin', to: "pages#admin"
  get '/dj', to: "pages#dj"
  get '/organizer', to: "pages#organizer"

  scope '(:locale)' do
    namespace :admin do
      resources :djs, only: [:index, :update, :destroy, :show]
      resources :bookings, only: [:index, :create, :update, :destroy, :show]
      resources :events, only: [:index, :create, :update, :destroy, :show]
      resources :genres, only: [:index, :create, :update, :destroy, :show]
      resources :cancelations, only: [:index, :create, :update, :destroy, :show]
      resources :event_categories, only: [:index, :create, :update, :destroy, :show]
      resources :equipments, only: [:index, :create, :update, :destroy, :show]
      resources :who_we_are_pages, only: [:update, :show]
      resources :crew_pages, only: [:update, :show]
      resources :how_we_work_pages, only: [:update, :show]
      resources :policies_pages, only: [:update, :show]
      resources :terms_n_conditions_pages, only: [:update, :show]
      resources :organizers, only: [:index, :update, :destroy, :show]
      resources :cancelations_pages, only: [:update, :show]
      resources :password_resets, only: [:create, :update, :show, :edit]
      resources :passwords, only: [:create]
      resources :email_sender, only: [:index, :create] do
        collection do
          get :show
          put :update
        end
      end
    end

    namespace :dj do
      get :profile, to: "users#profile"
      resources :sessions, only: [] do
        collection do
          get :check
        end
      end
      resources :event_categories, only: [:index]
      resources :genres, only: [:index]
      resources :equipments, only: [:index]
      resources :cancelations, only: [:index]
      resources :users, only: [] do
        collection do
          post :step
          post :step_back
          post :update_profile
        end
      end
      resources :settings, only: [:index, :update] do
        collection do
          post :notifications
        end
      end
      resources :events, only: [:index, :show]
      resources :bookings, only: [:update]
    end

    namespace :organizer do
      get :profile, to: "users#profile"
      resources :sessions, only: [] do
        collection do
          get :check
        end
      end
      resources :event_categories, only: [:index]
      resources :genres, only: [:index]
      resources :equipments, only: [:index]
      resources :cancelations, only: [:index]
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
      end
      resources :favorite_djs, only: [:index, :update, :destroy]
      resources :events, only: [:index, :create, :show, :update, :destroy]
      resources :settings, only: [:index, :update] do
        collection do
          post :notifications
        end
      end
      resources :bookings, only: [:create, :destroy]
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

    resources :static_pages, only: [] do
      collection do
        get :terms_n_conditions
        get :how_we_work
        get :crew
        get :who_we_are
        get :cancelations
        get :policies
      end
    end

    resources :notifications, only: [:index]

  end
end
