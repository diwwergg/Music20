const URL_ORIGIN = window.location.origin;
const token = localStorage.getItem("token");
console.log(token);
console.log(location.pathname);


// Send api Create music
document.getElementById("music-form").addEventListener("submit", function (event) {
    createMusic();
});


// Send api Edit music 
document.getElementById("music-form2").addEventListener("submit", function (event) {
    editMusic();
})

function createMusic() {
    const musicName = document.getElementById("musicName").value;
    let photoLink = document.getElementById("photoLink").value;
    let musicLink = document.getElementById("musicLink").value;
    const description = document.getElementById("description").value;
    // remove all spaces from the string 
    photoLink = photoLink.replace(/\s/g, '');
    musicLink = musicLink.replace(/\s/g, '');

    const data = {
        musicName,
        photoLink,
        musicLink,
        description
    }
    if (musicName == "" || photoLink == "" || musicLink == "") {
        alert("Please fill in all fields");
        return;
    }
    if (confirm("Are you sure you want to add this music?")) {
        const URL = `${URL_ORIGIN}/music-manage/music`;
        $.ajax({
            type: "POST",
            headers: "Authorization: Bearer " + token,
            url: URL,
            data: data,
            success: function (res) {
                console.log(res);
                alert(result.message);
                // clear window location after submit
                window.location.href = `${URL_ORIGIN}/music-manage`
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}



function deleteMusic(id) {
    if (confirm("Are you sure you want to delete this music?")) {
        const URL = `${URL_ORIGIN}/music-manage/music/${id}`;
        $.ajax({
            url: URL,
            headers: { "Authorization": `Bearer ${token}` },
            method: "DELETE",
            success: function (result) {
                alert(result.message);
                window.location.href = `${URL_ORIGIN}/music-manage`
            }
        });
    }
}

function editMusic() {
    if (confirm("Are you sure you want to edit this music?")) {
        const id = document.getElementById(`musicId`).value;
        const musicName = document.getElementById(`musicName2`).value;
        let photoLink = document.getElementById(`photoLink2`).value;
        let musicLink = document.getElementById(`musicLink2`).value;
        const description = document.getElementById(`description2`).value;
        // remove all spaces from the string 
        photoLink = photoLink.replace(/\s/g, '');
        musicLink = musicLink.replace(/\s/g, '');

        const data = {
            musicName,
            photoLink,
            musicLink,
            description
        }
        if (!(id && musicName && photoLink && musicLink)) {
            alert("Please fill in all fields");
            return;
        }
        const URL = `${URL_ORIGIN}/music-manage/music/${id}`;
        $.ajax({
            type: "PUT",
            headers: { "Authorization": `Bearer ${token}` },
            url: URL,
            data: data,
            success: function (res) {
                console.log(res);
                alert(result.message);
                // clear window location after submit
                window.location.href = `${URL_ORIGIN}/music-manage`
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
}

function editMusicSet(id) {
    // get data from table 
    const musicName = document.getElementById(`musicName_${id}`).textContent.trim();
    const photoLink = document.getElementById(`photoLink_${id}`).src;
    const musicLink = document.getElementById(`musicLink_${id}`).textContent.trim();
    const description = document.getElementById(`description_${id}`).textContent.trim();
    
    // set data from input
    document.getElementById(`musicId`).value = id;
    document.getElementById(`musicName2`).value = musicName;
    document.getElementById(`photoLink2`).value = photoLink;
    document.getElementById(`musicLink2`).value = musicLink;
    document.getElementById(`description2`).value = description;

}