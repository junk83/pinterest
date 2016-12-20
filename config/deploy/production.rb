server '52.68.15.9', user: 'jun', roles: %w{app db web}

#デプロイするサーバにsshログインする鍵の情報を記述
set :ssh_options, keys: '~/.ssh/pinterest_key_rsa'
