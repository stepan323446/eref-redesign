let saveTimetableBtn = document.createElement('button');
let content = document.querySelector('#main .content');

saveTimetableBtn.classList.add('btn');
saveTimetableBtn.textContent = getLangText('Postaviti raspored na glavnu stranice', 'Állítsa be az ütemtervet a főoldalra');
saveTimetableBtn.addEventListener('click', (e) => {
    localStorage.setItem('eref-redesign-timetable', window.location.href);
    alert('Added')
});

content.prepend(saveTimetableBtn);