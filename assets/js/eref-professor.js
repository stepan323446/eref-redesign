// Professor page
class Proffesor {
    /**
     * Create professor object
     * @param {String} name 
     * @param {Element} element 
     */
    constructor(name, element) {
        this.name = name;
        this.element = element;
        this.contentInfo = false;
    }
}
let professors = [];
let professorBlocks = document.querySelectorAll('.professorsUL > li');
if (professorBlocks.length > 0) {
    let content = document.querySelector('fieldset.content');
    let oldProfessorContainers = document.querySelectorAll('.professorsUL');

    // Add new container
    let professorGrid = document.createElement('ul');
    professorGrid.classList.add('professor-blocks');
    content.append(professorGrid);


    // Remake items
    professorBlocks.forEach(elem => {
        /// Header ///
        let headerElem = document.createElement('div');
        headerElem.classList.add('professor-block__header');

        // Info old elements with data
        let oldTitleElem = elem.querySelector('span');
        let oldDocumentElem = elem.querySelector('a[title="Knjiga nastavnika"]');

        // Info data
        const profName = oldTitleElem.textContent;
        const profInfoUrl = oldTitleElem.children[0].getAttribute('href');
        const profDocUrl = oldDocumentElem.getAttribute('href');

        let professor = new Proffesor(profName.toLowerCase(), elem);

        let profTitle = document.createElement('div');
        profTitle.classList.add('proffesor-name');
        let profDownload = document.createElement('a');


        profTitle.innerHTML = '<i class="fa-solid fa-user"></i> ' + profName;
        profDownload.href = profDocUrl;
        profDownload.innerHTML = '<i class="fas fa-file-alt"></i>';

        // Get professor bio
        profTitle.addEventListener('click', async (e) => {
            let profContent = document.createElement('div');
            profContent.textContent = 'Loading information...';

            modalRedesign.showModalRedesign(profName, profContent);
            
            if(!professor.contentInfo) {
                const response = await fetch(profInfoUrl);
                professor.contentInfo = await response.text();
            }
            
            profContent.innerHTML = professor.contentInfo;
        });

        headerElem.append(profTitle);
        headerElem.append(profDownload);

        oldTitleElem.remove();
        oldDocumentElem.remove();


        elem.prepend(headerElem);
        professors.push(professor);
    });
    professorGrid.append(...professorBlocks);

    // Remove old containers
    oldProfessorContainers.forEach(elem => {
        elem.remove();
    });

    // Add search
    let inputContainer = document.createElement('div');
    inputContainer.classList.add('professor-form');

    let inputSearch = document.createElement('input');
    inputContainer.append(inputSearch);

    inputSearch.placeholder = (language == 'sr') ? 'Unesite ime profesora' : 'Írja be a professzor nevét';
    inputSearch.type = 'text';
    inputSearch.id = 'search-professor';
    inputSearch.addEventListener('input', (e) => {
        let searchText = inputSearch.value.toLowerCase();

        for (let i = 0; i < professors.length; i++) {
            // no text
            if(searchText.length == 0) {
                professors[i].element.hidden = false;
            }

            // has text
            if(professors[i].name.includes(searchText))
                professors[i].element.hidden = false;
            else
                professors[i].element.hidden = true;
        }
    })
    content.prepend(inputContainer);
}