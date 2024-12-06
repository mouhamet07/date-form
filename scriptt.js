let choices = {
    date: null,
    time: null,
    activity: null,
    location: null,
    meal: null,
};

function nextStep(step) {
    document.querySelectorAll('.step').forEach(stepDiv => stepDiv.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function generateOptions(options, containerId, callback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => callback(option);
        container.appendChild(button);
    });
}

function selectActivity(activity) {
    choices.activity = activity;

    // Mettre à jour les boutons pour refléter le choix
    document.querySelectorAll('#step-2 .options button').forEach(button => {
        button.classList.toggle('active', button.textContent === activity);
    });

    // Générer des lieux selon l'activité choisie
    const locations = {
        'Cinéma': ['Pathé', 'Seanama', 'CCOS'],
        'Balade': ['Corniche', 'BECEAO', 'Pointe', 'Plage Mermoz'],
        'Restaurant': ['Eguette', 'Sarayi', 'Union Club'],
    };

    generateOptions(locations[activity], 'location-options', selectLocation);
}

function selectLocation(location) {
    choices.location = location;

    // Mettre à jour les boutons pour refléter le choix
    document.querySelectorAll('#location-options button').forEach(button => {
        button.classList.toggle('active', button.textContent === location);
    });
}

function selectMeal(meal) {
    choices.meal = meal;

    // Mettre à jour les boutons pour refléter le choix
    document.querySelectorAll('#step-4 .options button').forEach(button => {
        button.classList.toggle('active', button.textContent === meal);
    });
}

function showSummary() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!date || !time || !choices.activity || !choices.location || !choices.meal) {
        alert('Veuillez compléter toutes les étapes avant de continuer.');
        return;
    }

    choices.date = date;
    choices.time = time;

    const summaryText = `
        <strong>Date :</strong> ${choices.date} <br>
        <strong>Heure :</strong> ${choices.time} <br>
        <strong>Activité :</strong> ${choices.activity} <br>
        <strong>Lieu :</strong> ${choices.location} <br>
        <strong>Repas :</strong> ${choices.meal}
    `;

    document.getElementById('summary-text').innerHTML = summaryText;
    nextStep(5); // Étape 5 correspond au résumé
}
