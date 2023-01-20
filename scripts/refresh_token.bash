scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")

source "$scriptDir"/../.env.local
start "https://accounts.spotify.com/authorize?response_type=code&client_id=$SPOTIFY_CLIENT_ID&scope=user-read-playback-state&redirect_uri=https://sharjects-sharlottes.vercel.app/callback/spotify"
read -p "Input Code:" code
response=$(curl -X POST -d grant_type=authorization_code -d code=$code -d client_id=$SPOTIFY_CLIENT_ID -d client_secret=$SPOTIFY_CLIENT_SECRET -d redirect_uri=https://sharjects-sharlottes.vercel.app/callback/spotify https://accounts.spotify.com/api/token)
if [[ "$response" =~ \"refresh_token\":\"([0-9A-Za-z_-]*)\", ]]; then
  echo "new refresh token granted!"
  echo "${BASH_REMATCH[1]}"
fi