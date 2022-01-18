import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from pprint import pprint
from time import sleep

def init():
    scope =  "playlist-modify-private"
    scope = "user-read-playback-state,user-modify-playback-state"


    sp = spotipy.Spotify(
        auth_manager=SpotifyOAuth(
            scope=scope,
            redirect_uri=os.getenv('SPOTIPY_REDIRECT_URI'),
            client_id=os.getenv('SPOTIPY_CLIENT_ID'),
            client_secret=os.getenv('SPOTIPY_CLIENT_SECRET'),
            show_dialog=True,
            cache_path="token.txt"
        )
    )
