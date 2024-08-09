class LegendItem {
    /**
     * @param {string} title 
     * @param {string} color 
     */
    constructor(title, color) {
        this.title = title;
        this.color = color;
    }
    createLegemdElement() {
        let legendElem = document.createElement('div');
        legendElem.classList.add('legend-item');
        legendElem.innerHTML = `<span style="background: ${this.color};"></span> ${this.title}`;

        this.legendElem = legendElem;
        return legendElem;
    }
}


let legendItems = [];
if(window.location.href.includes('default/literature')) {
    legendItems.push(
        new LegendItem((language == 'sr') ? 'Obavezni predmeti' : 'Kötelező tantárgy', '#71afde'),
        new LegendItem((language == 'sr') ? 'Izborni predmeti' : 'Választható tantárgy', '#c2e1f9'),
    )
}
else {
    legendItems.push(
        new LegendItem((language == 'sr') ? 'Obavezni predmeti' : 'Kötelező tantárgy', '#71afde'),
        new LegendItem((language == 'sr') ? 'Izabrani predmeti' : 'Kiválasztott tantárgy', '#ede789'),
        new LegendItem((language == 'sr') ? 'Izborni predmeti' : 'Választható tantárgy', '#c2e1f9'),
        new LegendItem((language == 'sr') ? 'Položeni predmeti' : 'Letett tantárgy', '#91d483')
    )
}

if (isAuthorized) {
    let legendContainer = document.getElementById('notification');
    let legendWrapper = document.createElement('div');
    legendWrapper.classList.add('legend-wrapper');

    legendContainer.innerHTML = '';
    let legendItemElems = [];

    legendItems.forEach(legend => {
        legendItemElems.push(legend.createLegemdElement());
    });
    legendWrapper.append(...legendItemElems);
    legendContainer.append(legendWrapper);

}