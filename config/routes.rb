Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'
  scope '(:locale)' do
  resources :events, only: [:index, :create, :update, :destroy, :show]

  resources :genres, only: [:index, :create, :update, :destroy, :show]

  resources :cancelations, only: [:index, :create, :update, :destroy, :show]

  resources :event_categories, only: [:index, :create, :update, :destroy, :show]

  resources :equipments, only: [:index, :create, :update, :destroy, :show]

  resources :who_we_are_pages, only: [:index, :create, :update, :destroy, :show]

  resources :crew_pages, only: [:index, :create, :update, :destroy, :show]

  resources :how_we_work_pages, only: [:index, :create, :update, :destroy, :show]

  resources :policies_pages, only: [:index, :create, :update, :destroy, :show]

  resources :terms_n_conditions_pages, only: [:index, :create, :update, :destroy, :show]

    resources :attachments, only: [] do
      collection do
        post '/:entity_type', to: 'attachments#create'
      end
    end
  resources :cancelations_pages, only: [:index, :create, :update, :destroy, :show]

    resources :pages, only:[] do
       get :check_session
    end
    resources :sessions, only: [:create] do
      collection do
        delete :destroy
        get :check
      end
    end

    get '/app', to: 'pages#app'
    resources :users, only: [:create] do
      collection do
        post :email_available
        get :confirm_email
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
