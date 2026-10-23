document.addEventListener('DOMContentLoaded', () => {
    // База предметов 1-го курса со скриншота транскрипта МУА и их реальные кредиты
    const muaCurriculum = {
        it: [
            { id: "com150", name: "Introduction to Engineering & CS", credits: 5 },
            { id: "com149", name: "Programming Languages I (Java)", credits: 5 },
            { id: "com146", name: "Calculus", credits: 5 },
            { id: "com147", name: "Linear Algebra", credits: 5 },
            { id: "dfl101", name: "Professional English Language I", credits: 2 },
            { id: "mde205", name: "Russian Language", credits: 4 },
            { id: "mde157", name: "Geography of Kyrgyzstan", credits: 3 },
            { id: "mde131", name: "Physical Education I", credits: 1 },
            { id: "mde108", name: "Manas Studies", credits: 2 }
        ],
        business: [
            { id: "bus1", name: "Microeconomics / Микроэкономика", credits: 5 },
            { id: "bus2", name: "Macroeconomics / Макроэкономика", credits: 5 },
            { id: "bus3", name: "Management Basics / Основы менеджмента", credits: 4 },
            { id: "bus4", name: "Business Statistics / Статистика", credits: 5 },
            { id: "bus5", name: "Financial Accounting / Бух. учет", credits: 5 },
            { id: "bus6", name: "Marketing Principles / Маркетинг", credits: 4 }
        ],
        ir: [
            { id: "ir1", name: "History of International Relations", credits: 5 },
            { id: "ir2", name: "Political Science / Политология", credits: 4 },
            { id: "ir3", name: "Geopolitics / Геополитика", credits: 5 },
            { id: "ir4", name: "Diplomatic Protocol & Etiquette", credits: 4 },
            { id: "ir5", name: "Foreign Language (Advanced)", credits: 6 }
        ]
    };

    const facultySelect = document.getElementById('faculty-select');
    const subjectsBlock = document.getElementById('subjects-block');
    const subjectsContainer = document.getElementById('subjects-container');
    const btnCalculate = document.getElementById('btn-calculate');
    const calcResult = document.getElementById('calc-result');
    const resultStatus = document.querySelector('.calc__result-status');
    const resultText = document.getElementById('result-text');
    const creditsValue = document.getElementById('calc-credits-value');

    // Генерация чекбоксов на основе выбранной специальности
    facultySelect.addEventListener('change', (e) => {
        const selectedFaculty = e.target.value;
        const subjects = muaCurriculum[selectedFaculty];

        subjectsContainer.innerHTML = '';
        calcResult.classList.add('calc__hidden');

        if (subjects) {
            subjects.forEach((subject) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'calc__checkbox-item';
                itemDiv.innerHTML = `
                    <input type="checkbox" id="${subject.id}" value="${subject.credits}" class="calc__checkbox">
                    <label for="${subject.id}">${subject.name} <strong>(${subject.credits} cr)</strong></label>
                `;
                subjectsContainer.appendChild(itemDiv);
            });
            subjectsBlock.classList.remove('calc__hidden');
        }
    });

    btnCalculate.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.calc__checkbox');
        let passedCount = 0;
        let totalCount = checkboxes.length;
        let earnedCredits = 0;

        checkboxes.forEach(cb => {
            if (cb.checked) {
                passedCount++;
                earnedCredits += parseInt(cb.value); // Складываем кредиты чекнутых предметов
            }
        });

        let academicDifference = totalCount - passedCount;
        calcResult.classList.remove('calc__hidden');
        resultStatus.className = 'calc__result-status';
        
        // Обновляем значение кредитов на экране
        creditsValue.textContent = earnedCredits;
        
        // Вывод вердикта на основе разницы предметов
        if (academicDifference <= 2) {
            resultStatus.classList.add('calc__status-success');
            resultStatus.textContent = 'Отличный шанс на перевод!';
            resultText.innerHTML = `Ваша акад. разница составляет всего <strong>${academicDifference} предмета(ов)</strong>. Вы успешно переносите <strong>${earnedCredits} кредитов</strong> и подходите для прямого перевода в МУА без потери курса!`;
        } else if (academicDifference <= 4) {
            resultStatus.classList.add('calc__status-warning');
            resultStatus.textContent = 'Перевод возможен с до сдачей';
            resultText.innerHTML = `Ваша акад. разница: <strong>${academicDifference} предмета(ов)</strong>. Вы перезачли <strong>${earnedCredits} кредитов</strong>. Перевод допускается, но вам придется параллельно закрыть остаток кредитов в первом семестре.`;
        } else {
            resultStatus.classList.add('calc__status-danger');
            resultStatus.textContent = 'Превышен лимит разницы предметов';
            resultText.innerHTML = `Ваша акад. разница составляет <strong>${academicDifference} предметов</strong> (максимально допустимо 4). Из-за нехватки кредитов рекомендуется перевод на курс ниже или летний семестр.`;
        }
        
        calcResult.scrollIntoView({ behavior: 'smooth' });
    });
});
    // ==========================================
    // ЛОГИКА ФИЛЬТРАЦИИ КАРТОЧЕК БАДДИ
    // ==========================================
    const filterButtons = document.querySelectorAll('.buddy__filter-btn');
    const buddyCards = document.querySelectorAll('.buddy__card-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Переключаем класс активности у кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Фильтруем карточки
            buddyCards.forEach(card => {
                const cardFaculty = card.getAttribute('data-faculty');
                
                if (filterValue === 'all' || filterValue === cardFaculty) {
                    card.style.display = 'flex';  // Показываем карточку
                } else {
                    card.style.display = 'none';  // Намертво скрываем остальные карточки
                }
            });
        });
    });
// git add .
// git commit -m "style: polish index cta card and center layout"
// git push origin main
