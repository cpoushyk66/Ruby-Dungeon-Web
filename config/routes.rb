Rails.application.routes.draw do
  
  resources :spell_slots
  resources :spells
  resources :pockets
  resources :equipment
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #Session Routes
  post "login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  #User BASIC CRUD Routes
  get "users", to: "users#index"
  get "me", to: "users#show"
  post "users", to: "users#create"
  patch "users/:id", to: "users#update"
  delete "users/:id", to: "users#destroy" 

  #User Custom Routes
    #Login User and get full info
  get "users/login/:username/:password", to: "users#login"
    #Give admin power to user given admin is admin
  patch "users/:admin_id/give_admin_access/:user_id", to: "users#give_admin_access"

  #User - Character Intertwined Routes
  get "users/:id/characters", to: "characters#characters"

  #Character CRUD Routes
  get "characters", to: "characters#index"
  get "characters/:id", to: "characters#show"
  post "characters", to: "characters#create"
  patch "characters/:id", to: "characters#update"
  delete "characters/:id", to: "characters#destroy"
 
  #Characters Custom Routes
   #Makes character buy item with id :id
  get "characters/:id/:shop_action/:item_id", to: "characters#shop"
  patch "characters/:id/level_up", to: "characters#level_up"
  
  #Enemy Basic CRUD Routes
  get "enemies", to: "enemies#index"
  get "enemies/:id", to: "enemies#show"
  post "enemies", to: "enemies#create"
  patch "enemies/:id", to: "enemies#update"
  delete "enemies/:id", to: "enemies#destroy"

  #Enemy Custom Routes
    #Get a number of random enmies equal to :num
  get "enemies/random/:num", to: "enemies#random"

  #Item Basic CRUD Routes
  get "items", to: "items#index"
  get "item/:id", to: "items#show"
  post "items", to: "items#create"
  patch "items/:id", to: "items#update"
  delete "items/:id", to: "items#destroy"

  #Item Custom Routes
    #Get a number of random items equal to :num
  get "items/random/:num", to: "items#random"

  #Spell Basic CRUD Routes
  get "spells", to: "spells#index"
  get "spells/:id", to: "spells#show"
  post "spells", to: "spells#create"
  patch "spells/:id", to: "spells#update"
  delete "spells/:id", to: "spells#destroy"

  #Special Custom Routes
  get "dungeons/generate/:num", to: "dungeons#generate_dungeon"
  get "dungeons/get_leveled_enemies/:amount/:difficulty", to: "dungeons#get_leveled_enemies"


  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
