var insert_btns = document.querySelectorAll(".insert_img");
insert_btns.forEach(insert_btn => {
    insert_btn.addEventListener('change', e => {
        var formId = insert_btn.classList.item(2);
        var img_frame = document.querySelector('div#' + formId + " div#img_frame");
        var img = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            // log to console
            // logs data:<type>;base64,wL2dvYWwgbW9yZ...
            var base64 = reader.result;
            img_frame.firstElementChild.src = base64;
        };
        reader.readAsDataURL(img);
    })
})