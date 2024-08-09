if (isAuthorized) {
    // About
    let tutorialBtnText = document.getElementById('tutorial').textContent;
    let contentAbout = document.getElementById('tutorialDialog').innerHTML;

    let h1Title = document.querySelector('.form h1');
    let h1span = document.createElement('span');
    h1span.innerHTML = `${tutorialBtnText} <i class="fas fa-share-square"></i>`;
    h1span.addEventListener('click', (e) => {
        modalRedesign.showModalRedesign(tutorialBtnText, contentAbout);
    })

    h1Title.append(h1span);
}