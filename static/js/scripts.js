// document.getElementById("right-panel").style.textAlign = "center"
// document.getElementById("masterPlay").addEventListener("click", function() {
//     var audioPlay = new Audio(Flask.url_for("static", {"filename": "songs/1.mp3"}))
//     audioPlay.play()
// })

var songs = document.querySelectorAll("#container-one span.songName")
let song_video = document.getElementById("song_video")

for(var i=0;i<songs.length;i++){
    songs[i].addEventListener("click", function() {
        const title = this.textContent
        console.log(title)
        song_video.setAttribute("src", Flask.url_for("static", {"filename" : `Urban%20Hymns/${title}/${title}.mp4`}))
        const vidPlayer = document.getElementById("vidplayer")
        vidPlayer.load()
        vidPlayer.play()
    });
}

