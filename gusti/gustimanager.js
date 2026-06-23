window.GustiManager = {
    chiaveStorage: 'gelato_gusti',
    lista: [],

    inizializza: function() {
        this.lista = JSON.parse(localStorage.getItem(this.chiaveStorage)) || ["Fiordilatte", "Cioccolato", "Nocciola", "Pistacchio"];
        this.aggiornaInterfaccia();
    },

    aggiornaInterfaccia: function() {
        const listaContainer = document.getElementById('lista-gusti');
        const selectGusto = document.getElementById('gusto-select');
        if(!listaContainer || !selectGusto) return;
        listaContainer.innerHTML = ''; selectGusto.innerHTML = '';
        this.lista.sort();
        this.lista.forEach((gusto, index) => {
            const div = document.createElement('div');
            div.className = 'gusto-item';
            div.innerHTML = `<span>${gusto}</span> <button class="btn-danger table-btn" onclick="window.GustiManager.elimina(${index})">X</button>`;
            listaContainer.appendChild(div);
            const option = document.createElement('option');
            option.value = gusto; option.textContent = gusto;
            selectGusto.appendChild(option);
        });
        localStorage.setItem(this.chiaveStorage, JSON.stringify(this.lista));
    },

    aggiungi: function() {
        const input = document.getElementById('nuovo-gusto');
        const nuovoGusto = input.value.trim();
        if(nuovoGusto === "") return alert("!");
        if(this.lista.includes(nuovoGusto)) return alert("!");
        this.lista.push(nuovoGusto); input.value = ""; this.aggiornaInterfaccia();
    },

    elimina: function(index) {
        // Messaggio tradotto dinamicamente
        if(confirm(window.LinguaManager.getTesto('confEliminaGusto') + ` "${this.lista[index]}"?`)) {
            this.lista.splice(index, 1); this.aggiornaInterfaccia();
        }
    }
};