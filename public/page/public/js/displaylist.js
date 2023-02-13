let tracks = document.querySelector('.tracks');

class Music {
  constructor(id, name, img, path, singer) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.path = path;
    this.singer = singer;
  }
}

const getData = async () => {
  const token = localStorage.getItem('token');
  const url = 'http://localhost:3000/music-manage/music';

  if (!token) {
    window.location.href = '/';
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


const displayMusic2 = async () => {
  const musics = await getData();
  const musicInstances = await musics.map(music => new Music(
    music.id,
    music.musicName,
    music.photoLink,
    music.musicLink,
    music.description
  ));
  const renderHtmlAllSong = () => {
    for (let i = 0; i < musicInstances.length; i++) {
      const key = musicInstances[i].id;

      let Html =
        ` <div class="song" key=${key}>
          <div class="img">
          <img src="${String(musicInstances[i].img)}"/>
          </div>
          <div class="more">
          <audio src="${String(musicInstances[i].path)}" id="music"></audio>
          <div class="song_info">
             <p id="title">${musicInstances[i].name.toString()}</p>
             <p>${musicInstances[i].singer.toString()}</p>
          </div>
          <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
          </div>
        </div>`;

      tracks.insertAdjacentHTML("beforeend", Html);
    };

  }
  renderHtmlAllSong();
}


displayMusic2();
