from album import Album
from song import Song
import os
from flask import Flask, render_template
from flask_jsglue import JSGlue
from youtube_data import init
import time

app = Flask(__name__)
jsglue = JSGlue(app)

youtube = init()

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/search/album/")
def search_album():
    songs = []
    root_path = "static/Urban Hymns"
    for _dir in os.listdir(root_path):
        if _dir == "cover.jpg":
            continue
        cur_dir_path = os.path.join(root_path, _dir)

        mp3_path = ""
        mp4_path = ""
        file_name = ""

        for _file in os.listdir(cur_dir_path):
            file_path = os.path.join(cur_dir_path, _file)
            exc = _file[-3:]
            filename = _file[:-4]
            file_name = filename

            if exc == "mp3":
                request = youtube.search().list(
                    part="snippet",
                    maxResults=2,
                    q="Urban Hymns " + filename
                )
                response = request.execute()

                time.sleep(10)
                image = response["items"][0]["snippet"]["thumbnails"]["default"]["url"]
                mp3_path = file_path
            else:
                mp4_path = file_path

        if len(file_name) > 0:
            song = Song(file_name, image, mp3_path, mp4_path)
            songs.append(song)
    
    album = Album("Urban Hymns", "Urban Hymns/cover.jpg", songs)
    return render_template("album.html", album=album)

if __name__ == "__main__":
    app.run(debug=True)