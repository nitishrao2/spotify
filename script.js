
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let progressBar=document.getElementById('progressBar');
let gif=document.getElementById('gif');
let audioElement=new Audio('songs/1.mp3');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
  {songName:"My stereo hearts", filePath:"songs/1.mp3", coverPath:"album-cover/stereo-hearts-album-cover.jpg"},
  {songName:"Animals", filePath:"songs/2.mp3", coverPath:"album-cover/animal-album-cover.jpg"},
  {songName:"Dusk till Dawn", filePath:"songs/3.mp3", coverPath:"album-cover/dusk-till-dawn-album-cover.jpg"},
  {songName:"Enemy", filePath:"songs/4.mp3", coverPath:"album-cover/enemy-album-cover.jpg"},
  {songName:"Let me down slowly", filePath:"songs/5.mp3", coverPath:"album-cover/let-me-down-slowly-album-cover.jpg"},
  {songName:"Another love", filePath:"songs/6.mp3", coverPath:"album-cover/another-love-album-cover.jpg"},
  {songName:"Lovely", filePath:"songs/7.mp3", coverPath:"album-cover/lovely-song-cover.jpg"}
];

songItems.forEach((element,i) => {
  element.getElementsByTagName("img")[0].src=songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
  }
})

audioElement.addEventListener('timeupdate',()=>{
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
  progressBar.value=progress;
})

progressBar.addEventListener('change',()=>{
  audioElement.currentTime=(progressBar.value*audioElement.duration)/100;
})

const makeAllPlay=()=>{
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element )=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{ 
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex>=6){
      progressBar=0;
      songIndex = 0;
  }
  else{
    progressBar=0;
      songIndex += 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<=0){
    progressBar=0;
      songIndex = 0;
  }
  else{
    progressBar=0;
      songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  
})