function generarCuestionario() {
    const inputText = document.getElementById('inputText').value;
    const preguntasRespuestas = inputText.split(',');

    const cuestionario = preguntasRespuestas.map(item => {
        const [pregunta, respuestas] = item.split(';');
        if (respuestas.includes('*')) {
            let opciones = respuestas.split('*').map(op => op.trim());
            opciones = opciones.sort(() => Math.random() - 0.5);
            return {
                pregunta: pregunta.trim(),
                opciones: opciones
            };
        } else {
            return {
                pregunta: pregunta.trim(),
                respuesta: respuestas.trim()
            };
        }
    });

    cuestionario.sort(() => Math.random() - 0.5);

    mostrarCuestionario(cuestionario);
}

function mostrarCuestionario(cuestionario) {
    const contenedor = document.getElementById('cuestionario');
    contenedor.innerHTML = '';

    cuestionario.forEach((item, index) => {
        const divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta');

        const preguntaTexto = document.createElement('p');
        preguntaTexto.textContent = `${index + 1}. ${item.pregunta}`;
        divPregunta.appendChild(preguntaTexto);

        if (item.opciones) {
            item.opciones.forEach(opcion => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `pregunta${index}`;
                label.appendChild(input);
                label.appendChild(document.createTextNode(opcion));
                divPregunta.appendChild(label);
                divPregunta.appendChild(document.createElement('br'));
            });
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Escriba su respuesta';
            divPregunta.appendChild(input);
        }

        contenedor.appendChild(divPregunta);
    });
}
