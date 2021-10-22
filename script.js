
const video = document.querySelector("#video");
const videoPlay = document.querySelector(".videoplay");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
let model;
const card = document.querySelectorAll(".card");
const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

const die = document.querySelector(".die");
let active = true;
die.addEventListener("click", function () {
    if (active) {
        active = false;
        die.textContent = "hidupkan Kembali";
        die.classList = "btn btn-primary die";
    } else {
        active = die;
        die.textContent = "Matikan fitur Deteksi Kamera";
        die.classList = "btn btn-danger die";
    }

})

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                video.srcObject = stream;
                setInterval(detection, 1000);
            },
                err => console.log(err)
            )
        }
    });
let kanan = true;
let kiri = false;
let mKanan = ["doja", "trap", "dusk", "rusia"];
let mKiri = ["aviva", "trap2", "lipa", "rusia"];

function detection() {
    model.detect(video).then(prediction => {
        if (active) {
            if (prediction.length !== 0) {

                let hand = prediction[0].bbox;
                let x = Math.floor(hand[0]);
                let y = Math.floor(hand[1]);
                console.log(x)
                if (x <= 105) {
                    //kiri
                    kiri = true;
                    kanan = false;
                } else if (x >= 300) {
                    //kanan
                    kiri = false;
                    kanan = true;
                }
                if (kanan) {
                    m = mKanan[Math.floor(Math.random() * 4)];
                    videoPlay.src = `/video/${m}.mp4`;
                } else if (kiri) {
                    m = mKiri[Math.floor(Math.random() * 4)];
                    videoPlay.src = `/video/${m}.mp4`;
                }
            }
        }
        // run = false;
        // setInterval(() => {
        //     run = true;
        // }, 5000);
    })
}
let tombol = document.querySelector(".tombol");
let restart = document.querySelector(".restart");
let toggle = false;
tombol.addEventListener("click", function (e) {
    toggle = !toggle;
    if (toggle) {
        videoPlay.pause();
        tombol.firstElementChild.classList = "fas fa-play";
    } else {
        videoPlay.play();
        tombol.firstElementChild.classList = "fas fa-pause";
    }

})
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
})


restart.addEventListener("click", function () {
    restart.classList.add("active");
    setInterval(() => {
        restart.classList.remove("active");
    }, 500);
    videoPlay.load();
})
