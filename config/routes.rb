Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    post 'users/sign_up/register' => 'users/registrations#register'
  end

  resources :users, only:[:show, :edit, :update]
  root 'pins#index'
end
