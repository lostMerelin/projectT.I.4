document.addEventListener('DOMContentLoaded', function() {
    const skillsContainer = document.getElementById('skillsContainer');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultOutput = document.getElementById('resultOutput');
    
    addSkillField();
    
    addSkillBtn.addEventListener('click', addSkillField);
    
    submitBtn.addEventListener('click', submitSkills);
    
    function addSkillField() {
        const skillGroup = document.createElement('div');
        skillGroup.className = 'skill-input-group';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'skill-input';
        input.placeholder = 'Введите навык...';
        input.autocomplete = 'off';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-skill';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Удалить поле';
        removeBtn.addEventListener('click', function() {
            if (skillsContainer.querySelectorAll('.skill-input-group').length > 1) {
                skillsContainer.removeChild(skillGroup);
            } else {
                input.value = '';
            }
        });
        
        const autocompleteList = document.createElement('div');
        autocompleteList.className = 'autocomplete-list';
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error';
        
        input.addEventListener('input', function() {
            const value = this.value.trim();
            autocompleteList.innerHTML = '';
            
            if (value.length > 0) {
                const regex = new RegExp(value, 'i');
                const matches = skillsDatabase.filter(skill => regex.test(skill));
                
                if (matches.length > 0) {
                    matches.slice(0, 5).forEach(match => {
                        const item = document.createElement('div');
                        item.className = 'autocomplete-item';
                        item.textContent = match;
                        item.addEventListener('click', function() {
                            input.value = match;
                            autocompleteList.style.display = 'none';
                            validateSkill(input);
                        });
                        autocompleteList.appendChild(item);
                    });
                    autocompleteList.style.display = 'block';
                } else {
                    autocompleteList.style.display = 'none';
                }
            } else {
                autocompleteList.style.display = 'none';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (e.target !== input && e.target !== autocompleteList) {
                autocompleteList.style.display = 'none';
            }
        });
        
        input.addEventListener('blur', function() {
            validateSkill(input);
        });
        
        skillGroup.appendChild(input);
        skillGroup.appendChild(removeBtn);
        skillGroup.appendChild(autocompleteList);
        skillGroup.appendChild(errorMsg);
        skillsContainer.appendChild(skillGroup);
        
        input.focus();
    }
    
    function validateSkill(inputElement) {
        const skillGroup = inputElement.parentElement;
        const errorMsg = skillGroup.querySelector('.error');
        const value = inputElement.value.trim();
        
        if (value === '') {
            errorMsg.textContent = '';
            return false;
        }
        
        if (!skillsDatabase.includes(value)) {
            errorMsg.textContent = 'Такого навыка нет в базе';
            return false;
        } else {
            errorMsg.textContent = '';
            return true;
        }
    }
    
    function submitSkills() {
        const inputs = document.querySelectorAll('.skill-input');
        const skills = [];
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            if (value !== '') {
                if (validateSkill(input)) {
                    skills.push(value);
                } else {
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            alert('Пожалуйста, исправьте ошибки в введенных навыках');
            return;
        }
        
        if (skills.length === 0) {
            alert('Пожалуйста, введите хотя бы один навык');
            return;
        }
        
        // Здесь будет запрос к серверу (заглушка)
        simulateServerRequest(skills);
    }
    
    // Заглушка для запроса к серверу
    function simulateServerRequest(skills) {
        // В реальном приложении здесь будет fetch или axios запрос
        console.log('Отправка навыков на сервер:', skills);
        
        setTimeout(() => {
            // В реальном приложении здесь будет обработка ответа сервера
            const professions = [
                "Frontend разработчик",
                "Backend разработчик",
                "Fullstack разработчик",
                "Data Scientist",
                "DevOps инженер",
                "UI/UX дизайнер",
                "Менеджер проектов"
            ];
            
            const randomProfession = professions[Math.floor(Math.random() * professions.length)];
            
            resultOutput.textContent = randomProfession;
            resultContainer.style.display = 'block';
            
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
});