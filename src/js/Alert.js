class Alert {
    async init() {
        const response = await fetch('json/alerts.json');
        const alerts = await response.json();

        if (alerts.length > 0) {
            this.renderAlerts(alerts);
        }
    }

    renderAlerts(alerts) {        
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        alerts.forEach((alert) => {
            const alertMessage = document.createElement('p');
            alertMessage.textContent = alert.message;
            alertMessage.style.backgroundColor = alert.background;
            alertMessage.style.color = alert.color;

            alertSection.appendChild(alertMessage);
        });

        const main = document.querySelector('main');
        main.prepend(alertSection);
    }
}

export default Alert;