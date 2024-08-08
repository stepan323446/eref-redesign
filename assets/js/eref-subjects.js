class LegendItem {
    /**
     * @param {string} title 
     * @param {string} color 
     */
    constructor(title, color) {
        this.title = title;
        this.color = color;
    }
}
let legendItems = [];
legendItems.push(
    new LegendItem((language == 'sr') ? 'Obavezni predmeti' : 'Kötelező tantárgy', '#71afde'),
    new LegendItem((language == 'sr') ? 'Izabrani predmeti' : 'Kiválasztott tantárgy', '#ede789'),
    new LegendItem((language == 'sr') ? 'Izborni predmeti' : 'Választható tantárgy', '#c2e1f9'),
    new LegendItem((language == 'sr') ? 'Položeni predmeti' : 'Letett tantárgy', '#91d483')
)

let legendContainer = document.getElementById('notification');
let legendWrapper = document.createElement('div');
legendWrapper.classList.add('legend-wrapper');

legendContainer.innerHTML = '';
let legendItemElems = [ ];

legendItems.forEach(legend => {
    let legendElem = document.createElement('div');
    legendElem.classList.add('legend-item');
    legendElem.innerHTML = `<span style="background: ${legend.color};"></span> ${legend.title}`;

    legendItemElems.push(legendElem);
});
legendWrapper.append(...legendItemElems);
legendContainer.append(legendWrapper);

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