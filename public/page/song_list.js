//song list

let All_song = [
   {
     name: "TIMETHAI - มีอะไรอีกมั้ยที่ลืมบอก",
     path: "https://github.com/garrncp/Songweb/raw/main/_8.mp3",
     img: "https://github.com/garrncp/Songweb/raw/main/_1.jpg" ,
     singer: "TIMETHAI"
   },
   {
     name: "แพ้ความอ่อนแอ - Silly fools",
     path: "https://github.com/garrncp/Songweb/blob/main/%E0%B9%81%E0%B8%9E%E0%B9%89%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%AD%20-%20Silly%20fools%20%5BOfficial%20MV%5D.mp3?raw=true",
     img: "https://github.com/garrncp/Songweb/raw/main/maxresdefault.jpg",
     singer: "Silly fools"
   }
];



/*tracks*/
let tracks = document.querySelector('.tracks');

//creating a list or generating Html
for (let i = 0; i < All_song.length; i++) {

  let Html = ` <div class="song">
      <div class="img">
      <img src="${All_song[i].img}"/>
      </div>
      <div class="more">
      <audio src="${All_song[i].path}" id="music"></audio>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
      </div>
      <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div>
    </div>`;

  tracks.insertAdjacentHTML("beforeend", Html);
};


