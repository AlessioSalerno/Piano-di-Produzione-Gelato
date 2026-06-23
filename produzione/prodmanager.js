window.ProdManager = {
    chiaveStorage: 'gelato_produzioni',
    lista: [],
    indiceModifica: -1,

    inizializza: function() {
        this.lista = JSON.parse(localStorage.getItem(this.chiaveStorage)) || [];
        this.renderTabella();
    },

    renderTabella: function() {
        const tbody = document.getElementById('corpo-tabella');
        if (!tbody) return;
        tbody.innerHTML = '';
        
        let totaleLitri = 0;

        this.lista.forEach((prod, index) => {
            let litriTotaliRiga = parseFloat(prod.quantita);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${this.formattaData(prod.data)}</td>
                <td><strong>${prod.gusto}</strong></td>
                <td style="color: #2980b9; font-weight: bold;">${litriTotaliRiga.toFixed(2)} L</td>
                <td><code>${prod.lotto}</code></td>
                <td></td>
                <td class="Azioni no-print">
                    <button class="btn-warning table-btn" onclick="window.ProdManager.avviaModifica(${index})">M</button>
                    <button class="btn-danger table-btn" onclick="window.ProdManager.elimina(${index})">X</button>
                </td>
            `;
            tbody.appendChild(tr);
            
            totaleLitri += litriTotaliRiga;
        });

        document.getElementById('totale-litri').innerText = totaleLitri.toFixed(2) + " L";
        localStorage.setItem(this.chiaveStorage, JSON.stringify(this.lista));
    },

    salva: function() {
        const data = document.getElementById('data').value;
        const gusto = document.getElementById('gusto-select').value;
        const quantita = parseFloat(document.getElementById('quantita').value);
        const lotto = document.getElementById('lotto').value.trim() || "-";

        if (!data || isNaN(quantita) || quantita <= 0 || !gusto) {
            alert(window.LinguaManager.getTesto('alertCampi'));
            return;
        }

        const oggettoProduzione = { data, gusto, quantita, lotto };

        if (this.indiceModifica === -1) {
            this.lista.push(oggettoProduzione);
        } else {
            this.lista[this.indiceModifica] = oggettoProduzione;
            this.indiceModifica = -1;
            document.getElementById('btn-salva-prod').className = "btn-success";
        }

        document.getElementById('quantita').value = "1.0";
        document.getElementById('lotto').value = "";
        window.LinguaManager.traduciInterfaccia();
        this.renderTabella();
    },

    avviaModifica: function(index) {
        const prod = this.lista[index];
        document.getElementById('data').value = prod.data;
        document.getElementById('gusto-select').value = prod.gusto;
        document.getElementById('quantita').value = prod.quantita;
        document.getElementById('lotto').value = prod.lotto === "-" ? "" : prod.lotto;

        this.indiceModifica = index;
        const btn = document.getElementById('btn-salva-prod');
        btn.innerText = window.LinguaManager.getTesto('btnApplicaModifiche');
        btn.className = "btn-warning";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    elimina: function(index) {
        if(confirm(window.LinguaManager.getTesto('confEliminaRiga'))) {
            this.lista.splice(index, 1);
            if(this.indiceModifica === index) {
                this.indiceModifica = -1;
                document.getElementById('btn-salva-prod').className = "btn-success";
                window.LinguaManager.traduciInterfaccia();
            }
            this.renderTabella();
        }
    },

    formattaData: function(dataString) {
        const d = new Date(dataString);
        return d.toLocaleDateString(window.LinguaManager.linguaCorrente === 'it' ? 'it-IT' : 'de-DE');
    }
};