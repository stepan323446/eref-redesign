if (isAuthorized) {
    // About
    let tutorialBtnText = document.getElementById('tutorial').textContent;
    let contentAbout = document.getElementById('tutorialDialog').innerHTML;

    let h1Title = document.querySelector('.form h1');
    let h1span = document.createElement('span');
    h1span.innerHTML = `${tutorialBtnText} <i class="fas fa-share-square"></i>`;
    h1span.addEventListener('click', (e) => {
        modalRedesign.showModalRedesign(tutorialBtnText, contentAbout);
    });

    h1Title.append(h1span);

    // Hint for grades
    let spanHints = document.querySelectorAll(".tableYear span[title]");
    let hintBlock = document.createElement("div");
    hintBlock.classList.add("eref-redesign__hint");
    hintBlock.hidden = true;
    document.body.append(hintBlock);

    document.addEventListener("mousemove", (e) => {
        let windowWidth = window.innerWidth;

        let hintWidth = hintBlock.offsetWidth;

        let xPos = e.pageX + 10;
        let yPos = e.pageY + 10;

        if (xPos + hintWidth > windowWidth) {
            hintBlock.style.right = `${windowWidth - e.pageX + 10}px`;
            hintBlock.style.left = '';
        } else {
            hintBlock.style.left = `${xPos}px`;
            hintBlock.style.right = '';
        }

        hintBlock.style.top = `${yPos}px`;
    });

    
    spanHints?.forEach(hint => {
        let hintInfo = hint.getAttribute("title");
        hint.removeAttribute("title");
        hint.addEventListener("mouseenter", (e) => {
            hintBlock.innerHTML = `<pre>${hintInfo}</pre>`;
            hintBlock.hidden = false;
        });
        hint.addEventListener("mouseleave", (e) => {
            hintBlock.hidden = true;
        }) ;
    });
}