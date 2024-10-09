let main = document.getElementById('main');

let buttonContainer = document.createElement('div');
buttonContainer.classList.add('eref-redesign__links');
main.append(buttonContainer);

function createNewLink(text, link) {
    let btn = document.createElement('a');
    btn.classList.add('btn');
    btn.textContent = text;
    btn.setAttribute('href', link);
    buttonContainer.append(btn);
}
function getLinkByLang(link) { 
    if (language == 'sr')
        return "/sr" + link;
    else
        return "/hu" + link
}
createNewLink(
    getLangText('E-tabla', 'E-tábla'), getLinkByLang('/default/eboard/index')
);
createNewLink(
    getLangText('Predmeti', 'Tantárgyak'), getLinkByLang('/default/subjects/index')
);
createNewLink(
    getLangText('Nastavnici', 'Tanárok'), getLinkByLang('/default/professors/index')
);
createNewLink(
    getLangText('Raspored', 'Órarend'), getLinkByLang('/default/schedule/groups/id/20')
);

let widgets = document.createElement('div');
widgets.classList.add('eref-index__widgets');
main.append(widgets);

let timetable_url = localStorage.getItem('eref-redesign-timetable');

function addSection(title, element) {
    let widget = document.createElement('div');
    widget.classList.add('eref-index__widget');
    widget.innerHTML += `<h2>${title}</h2>`;
    widget.append(element);
    widgets.append(widget);
}
// Eref timetable
if(timetable_url) {

}
else {
    content.innerHTML += `<p>You can add your timetable from "${getLangText('Raspored', 'Órarend')}"</p>`
}