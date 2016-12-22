Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'

  get '/admin', to: "pages#admin"
  get '/dj', to: "pages#dj"
  get '/organizer', to: "pages#organizer"

  scope '(:locale)' do
    namespace :admin do
      resources :djs, only: [:index, :create, :update, :destroy, :show]
      resources :bookings, only: [:index, :create, :update, :destroy, :show]
      resources :events, only: [:index, :create, :update, :destroy, :show]
      resources :genres, only: [:index, :create, :update, :destroy, :show]
      resources :cancelations, only: [:index, :create, :update, :destroy, :show]
      resources :event_categories, only: [:index, :create, :update, :destroy, :show]
      resources :equipments, only: [:index, :create, :update, :destroy, :show]
      resources :who_we_are_pages, only: [:index, :update, :show]
      resources :crew_pages, only: [:index, :update, :show]
      resources :how_we_work_pages, only: [:index, :update, :show]
      resources :policies_pages, only: [:index, :update, :show]
      resources :terms_n_conditions_pages, only: [:index, :create, :update, :destroy, :show]
      resources :organizers, only: [:index, :create, :update, :destroy, :show]
      resources :cancelations_pages, only: [:index, :create, :update, :destroy, :show]
      resources :password_resets, only: [:create, :update, :show, :edit]
      resources :passwords, only: [:create]
      resources :email_sender, only: [:index, :create] do
        collection do
          get :show
          put :update
        end
      end
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
  end
end
