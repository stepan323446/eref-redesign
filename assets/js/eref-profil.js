if(isAuthorized) {
    const mainContainer = document.getElementById('main');

    // Get text from H2 forms
    let changeInfoH2 = mainContainer.children[0];
    let changePassH2 = mainContainer.children[2];

    let changeInfoText = changeInfoH2.textContent;
    let changePassText = changePassH2.textContent;
    changeInfoH2.remove()
    changePassH2.remove();

    // Redesign forms
    let studentDataElem = document.getElementById('studentData').parentElement;
    let changePassElem = document.getElementById('profile').parentElement;

    formAppendH2(studentDataElem, changeInfoText);
    formAppendH2(changePassElem, changePassText);

    let formsContainer = document.createElement('div')
    formsContainer.classList.add('profile-forms-container');
    
    formsContainer.append(studentDataElem);
    formsContainer.append(changePassElem);

    mainContainer.append(formsContainer);

    /**
     * Place h2 header into the form
     * @param {HTMLElement} formElem Element <div class="form">...<...>
     * @param {String} textHeader caption for form
     */
    function formAppendH2(formElem, textHeader) {
        let fieldset = formElem.querySelector('fieldset');
        fieldset.innerHTML = `<h2>${textHeader}</h2>` + fieldset.innerHTML;
    }

    // Get student data for redesign
    let originDataElem = document.getElementById('student-data');
    let captionText = originDataElem.querySelector('.examTableCaption').textContent;
    let fields = originDataElem.querySelectorAll('tbody tr');
    
    
    let dataProfile = {
        avatarUrl: document.getElementById('student-avatar')?.children[0]?.getAttribute('src'),

        fields: [ ]
    };

    fields.forEach(field => {
        dataProfile.fields.push({
            key: field.children[0].textContent,
            value: field.children[1].textContent
        })
    });
    originDataElem.remove();
    document.querySelector('#main > .left').remove();
    console.log(dataProfile);

    // Credit data
    let creditDataTable = document.querySelector('#main > table');
    console.log(creditDataTable);

    // New page
    let profileInformation = document.createElement('div');
    profileInformation.classList.add('profile-redesign');

    let profileInfoLeft = document.createElement('div');
    profileInfoLeft.classList.add('profile-info');
    profileInfoLeft.innerHTML = `<h2>${captionText}</h2>`;

    let profileTableInfo = document.createElement('div');
    profileTableInfo.classList.add('profile-info__table');
    profileInfoLeft.append(profileTableInfo);

    let profileFields = [ ];

    dataProfile.fields.forEach(field => {
        let label = document.createElement('div');
        label.classList.add('profile-label');
        label.textContent = field.key;
        
        let value = document.createElement('div');
        value.classList.add('profile-value');
        value.textContent = field.value;

        profileFields.push(label, value);
    });
    profileTableInfo.append(...profileFields);

    let profileInfoRight = document.createElement('div');
    profileInfoRight.classList.add('profile-right');
    profilePhotoUrl = (dataProfile.avatarUrl) ? dataProfile.avatarUrl : '';
    profileInfoRight.innerHTML = `<div class="profile-image"><img src="${profilePhotoUrl}" alt=""></div>`;

    profileInfoRight.append(creditDataTable);

    
    profileInformation.append(profileInfoLeft);
    profileInformation.append(profileInfoRight);
    mainContainer.prepend(profileInformation);
}