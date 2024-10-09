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



class TimetableSubject {
    /**
     * 
     * @param {string} title 
     * * @param {string} prof 
     * * @param {string} room 
     * @param {Date} startTime 
     * * @param {Date} endTime 
     */
    constructor(title, prof, room, startTime, endTime) {
        this.title = title;
        this.prof = prof;
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = 'none';
    }
    createElement(has_next = true) {
        let subj = document.createElement('div');
        subj.classList.add('eref-subject', `status-${this.status}`);

        if(!has_next && this.status == "next")
            subj.classList.remove(`status-${this.status}`)


        if(this.status == "next" && has_next) {
            let header = document.createElement('div');
            header.classList.add('eref-subject__header');
            header.innerHTML = '<span>Počinje za: </span>';
            
            this.timerElem = document.createElement('span');
            this.timerElem.classList.add('eref-subject__timer');
            this.timerElem.textContent = '00:00';

            header.append(this.timerElem);
            this.__startCountdown();
            
            subj.append(header);
        }

        let subjectContent = document.createElement('div');
        subjectContent.innerHTML = `
        <div class="eref-subject__title">
            ${this.title}
        </div>
        <div class="eref-subject__meta">
            <span>${this.prof}</span>
            <span>${this.room}</span>
            <span>${TimetableSubject.getFormattedTime(this.startTime)} - ${TimetableSubject.getFormattedTime(this.endTime)}</span>
        </div>
        `;
        subj.append(subjectContent);

        return subj;
    }
    __startCountdown() {
        const interval = setInterval(() => {
            const now = new Date(); 
            const difference = this.startTime - now;
    
            if (difference <= 0) {
                clearInterval(interval);
                this.timerElem.textContent = '00:00';
                return;
            }
    
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
            this.timerElem.textContent = formattedTime;
        }, 1000);
    }
    static getFormattedTime(time) {
        let h = time.getHours()
        let m = time.getMinutes()
        
        if(h < 10)
            h = '0' + h;
        
        if(m < 10)
            m = '0' + m

        return `${h}:${m}`;
    }
    /**
     * 
     * @param {Array<TimetableSubject>} timetableSubjects 
     */
    static createElemets(timetableSubjects, has_next = false) {
        let subjects = document.createElement('div');
        subjects.classList.add('eref-subjects');

        for(let subj of timetableSubjects)
            subjects.append(subj.createElement(has_next));

        return subjects;
    }
    /**
     * 
     * @param {Element} column 
     */
    static __extractDataFromColumn(column) {
        let subjectName = column.children[0].textContent;
        let profName = '';
        let roomName = '';

        let profElem = column.children[1];
        let roomElem = column.children[2];

        const regex = /:\s*(.+)/;
        let profMatch = profElem.textContent.match(regex)
        let roomMatch= roomElem.textContent.match(regex);
        if (profMatch) {
            profName = profMatch[1];
        }
        
        if (roomMatch) {
            roomName = roomMatch[1];
        }
        return {
            subject: subjectName,
            professor: profName,
            room: roomName
        }
    }
    static __getTime(timeString) {
        const now = new Date();
        const [hours, minutes] = timeString.split(':');

        now.setHours(Number(hours));
        now.setMinutes(Number(minutes));

        return now;
    }
    /**
     * 
     * @param {Element} row 
     * @param {Array} times 
     */
    static extractDataFromRow(row, times) {
        const columns = row.children;
        let times_cp = times.slice();
        let subjects = [ ];


        for (let i = 1; i < columns.length; i++) {
            const col = columns[i];
            
            if(col.classList.contains('no_lecture')) {
                times_cp.shift();
                continue;
            }
            let subjectData = TimetableSubject.__extractDataFromColumn(col);
            let timeStart = TimetableSubject.__getTime(times_cp[0].start);
            let timeEnd = TimetableSubject.__getTime(times_cp[0].end);
            
            let timespan = col.getAttribute('colspan');
            if(timespan) {
                for (let t = 1; t <= timespan; t++) {
                    if(timespan == t)
                        timeEnd = TimetableSubject.__getTime(times_cp[0].end);

                    times_cp.shift();
                }
            }
            else {
                times_cp.shift();
            }
            subjects.push(new TimetableSubject(
                subjectData.subject, 
                subjectData.professor,
                subjectData.room,
                timeStart,
                timeEnd
                )
            )
        }

        return subjects;
    }
}
function addSection(title, link, getElement) {
    let widget = document.createElement('div');
    widget.classList.add('eref-index__widget');
    widget.innerHTML += `
    <div class="eref-widget__header">
        <h2>${title}</h2>
        <a href="${getLinkByLang('/default/subjects/index')}" class="eref-widget__ref">
            <i class="fas fa-share-square"></i>
        </a>
    </div>
    `;
    widget.append(getElement());
    widgets.append(widget);
}
addSection(
    getLangText('Predmeti', 'Tantárgyak'), 
    getLinkByLang('/default/subjects/index'), 
    () => {
        let widgetContent = document.createElement('div');
        widgetContent.classList.add('eref-subjects', 'eref-content')

        let timetable_url = localStorage.getItem('eref-redesign-timetable');
        widgetContent.classList.add('none');
        if(!timetable_url) {
            widgetContent.innerHTML = `<p>You can add your timetable from "${getLangText('Raspored', 'Órarend')}"</p>`;
            return widgetContent;
        }
        // Get data from rasporeda
        widgetContent.innerHTML = `<p>Loading...</p>`;
        fetch(timetable_url)
        .then(response => {
            if (!response.ok) {
                widgetContent.innerHTML = `<p>Error ${response.status}</p>`;
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); 
        })
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const rows = tempDiv.querySelectorAll('.schedule tr');
            const now = new Date();

            let times = [ ];
            let nextSubject = null;
            let today = null;
            let tomorrow = [ ];
            let tomorrowIsMonday = false;

            // times
            let timeElems = rows[0].querySelectorAll('.schedule_titles_small');
            timeElems.forEach(elem => {
                let timeRegex = /(\d{2}:\d{2})h\s*-\s*(\d{2}:\d{2})h/;
                const matches = elem.textContent.match(timeRegex);
                if (matches) {
                    const startTime = matches[1];
                    const endTime = matches[2];
                    
                    times.push({start: startTime, end: endTime});
                }
            });
            console.log(times);

            const dateOfWeek = now.getDay();

            // today (not Saturday and not Sunday)
            if(dateOfWeek != 6 && dateOfWeek != 0) {
                today = TimetableSubject.extractDataFromRow(rows[dateOfWeek], times);

                for(let subj of today) {
                    // current subject
                    if(now >= subj.startTime && now <= subj.endTime)
                        subj.status = 'current';
                    // completed subject
                    else if(now > subj.endTime)
                        subj.status = 'completed';
                    
                    // next subject
                    if(now < subj.startTime) {
                        subj.status = 'next';
                        nextSubject = subj;
                        break;
                    }
                }
            }
            

            // Tomorrow (if not friday, saturday and sunday)
            if(dateOfWeek < 5 && dateOfWeek != 0) {
                tomorrow = TimetableSubject.extractDataFromRow(rows[dateOfWeek + 1], times);
            }
            else {
                // Monday
                tomorrow = TimetableSubject.extractDataFromRow(rows[1], times);
                tomorrowIsMonday = true;
            }

            widgetContent.innerHTML = '';

            // Today
            widgetContent.innerHTML += `<h3>${getLangText('Danas', 'Holnap')}</h3>`;
            if(today)
                widgetContent.append(TimetableSubject.createElemets(today));
            else
                widgetContent.innerHTML += `<p>${getLangText('Danas nema ničega', 'Ma nincs semmi')}</p>`;

            // Tomorrow
            if(tomorrowIsMonday)
                widgetContent.innerHTML += `<h3>${getLangText('Ponedeljak', 'Hétfő')}</h3>`;
            else
                widgetContent.innerHTML += `<h3>${getLangText('Sutra', 'holnap')}</h3>`;

            if(tomorrow)
                widgetContent.append(TimetableSubject.createElemets(tomorrow));
            else
                if(tomorrowIsMonday)
                    widgetContent.innerHTML += `<p>${getLangText('Sutra nema ničega', 'Nincs semmi holnap')}</p>`;
                else
                    widgetContent.innerHTML += `<p>${getLangText('U ponedeljak nema ničega', 'Hétfőn nincs semmi')}</p>`;

            widgetContent.innerHTML += `<p class="eref-widget__note">If the schedule does not match yours, go to the subjects and set your own again</p>`

            console.log(nextSubject)
            // Next subject
            if(nextSubject)
                widgetContent.prepend(nextSubject.createElement());
            else
                widgetContent.innerHTML = `<p>${getLangText('Sada nemate ništa', 'Most nincs semmi')}</p>` + widgetContent.innerHTML;


        })
        .catch(error => {
            widgetContent.innerHTML = `<p>Unexcepted Error</p>`;
            console.error(error);
            return widgetContent;
        });
        

        return widgetContent;
    }
);