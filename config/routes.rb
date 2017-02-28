Rails.application.routes.draw do

  devise_for :users, controllers: { registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    post 'users/sign_up/register' => 'users/registrations#register'
  end

  resources :users, only:[:show, :edit, :update] do
    member do
      # get :boards, :pins
      get :pins, :following, :followers
    end
    collection do
      patch 'update_password'
      get :search
    end
  end

  resource :pins do
    member do
      get 'upload'
      post 'upload'
    end
  end
  resources :pinings, only:[:edit, :update, :destroy]
  # post '/pins/upload', to: 'pins#upload'

  resources :boards do
    resources :pins
  end

  resource :follow_users, only: [:create, :destroy]

  root 'pins#index'

end
