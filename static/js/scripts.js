var songs = document.querySelectorAll("#container-one span.songName")
let song_video = document.getElementById("song_video")
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songIndex = 1;
var song_title_name = "keep";

for(var i=0;i<songs.length;i++){
    songs[i].addEventListener("click", function(event) {
        const title = this.textContent
        console.log(title)
        song_title_name = title;
        song_video.setAttribute("src", Flask.url_for("static", {"filename" : `Urban%20Hymns/${title}/${title}.mp4`}))
        const vidPlayer = document.getElementById("vidplayer")
        vidPlayer.load()

        playMusic(Flask.url_for("static", {"filename" : `Urban%20Hymns/${title}/${title}.mp3`}))
        songIndex = Number(event.target.id);
    });
}

function playMusic(url) {
    audioElement.src = url
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

let songItems = Array.from(document.getElementsByClassName('songItem'));

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

document.getElementById('next').addEventListener('click', ()=>{
    console.log(songIndex)
    if(songIndex == 4){
        songIndex = 1
    }
    else{
        songIndex += 1;
    }
    title = document.getElementById(""+songIndex).textContent
    audioElement.src = Flask.url_for("static", {"filename" : `Urban%20Hymns/${title}/${title}.mp3`});
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 3
    }
    else{
        songIndex -= 1;
    }
    title = document.getElementById(""+songIndex).textContent
    audioElement.src = Flask.url_for("static", {"filename" : `Urban%20Hymns/${title}/${title}.mp3`});
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

let lyric_content = document.getElementById("lyrics-content")

function runScript() {
    $.ajax({
        url: Flask.url_for("do_something", {"song_name": song_title_name}),
        success: function(data) {
          lyric_content.innerHTML = data
        }
    });
}