Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    post 'users/sign_up/register' => 'users/registrations#register'
  end

  resources :users, only:[:show, :edit, :update] do
    resource :follow_users, only: [:create, :destroy]
    member do
      get :boards, :pins
      get :following, :followers
    end
    collection do
      patch 'update_password'
    end
  end

  post '/pins/upload', to: 'pins#upload'

  resources :boards do
    resources :pins
  end


  root 'pins#index'

end
