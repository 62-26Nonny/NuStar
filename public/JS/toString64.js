var insert_btns = document.querySelectorAll(".insert_file");
insert_btns.forEach(insert_btn => {
    insert_btn.addEventListener('change', e => {
        var file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // log to console
            // logs data:<type>;base64,wL2dvYWwgbW9yZ...
            var base64 = reader.result;
            var targetId = insert_btn.classList.item(1);
            document.getElementById(targetId).value = base64;
        };
        reader.readAsDataURL(file);
    });
})

var insert_lyrics = document.querySelector("#lyrics");
insert_lyrics.addEventListener('change', e => {
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        var string = reader.result;
        console.log(string);
        var targetId = insert_lyrics.classList.item(1);
        document.getElementById(targetId).value = string;
    }
    reader.readAsBinaryString(file);
})