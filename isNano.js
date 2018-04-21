function getTemplate (template) {
	const container = document.createElement('template');
	container.innerHTML = template;
	return container.content; 
}


stateInition = {
	'time': 'Сумерки',
	'place': 'Близ городского порта',
	'status': 'в норме'
}


const stateBar = (state) => `<div status>Время: ${state.time}, Место: ${state.place}, Состояние: ${state.status}.</div>`;

const question = `<p>Что вы будете делать дальше попытаетесь отрыть короб или начнете выбирать сеть?</p>
<input type="text"></input>
`;

const description = `<p>Отмель вблизи городского порта всегда кишила рыбой.</p>
<p>
Сидя на корме и неспешно потягивая ром вы оттягиваете момент<br>
когда нужно будет доставать сеть. Джарвис не пришел и вам <br>
придется ташить сеть одному.<br>
В вечерних сумерках вы заметили что что-то колышется на воде <br>
вбили. Весла не успели опустится и десятка раз и вот вы уже <br>
поднимаете добротный деревянный короб.<br>
Попробывав открыть короб ножом вы потерпели неудачу.</p>`

const header = document.getElementById('head')
header.appendChild(getTemplate(stateBar(stateInition)));

const container = document.getElementById('main')
container.appendChild(getTemplate(description));

const quest = document.getElementById('quest');
quest.appendChild(getTemplate(question));


const input = document.querySelector('input');
input.addEventListener('keydown', function(e) {
		if (e.key == "Enter"){
				let value = this.value;
				if (value) {
					window.location.hash = value;
				}
				
		}
});
function getLacationHash(hash) {
	hash = hash.replace('#', '');
	return hash;
}

window.addEventListener('hashchange', function() {
	alert(getLacationHash(window.location.hash))
})