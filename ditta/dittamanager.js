window.DittaManager = {
    chiaveStorage: 'gelato_ditta',
    carica: function() {
        const dati = JSON.parse(localStorage.getItem(this.chiaveStorage)) || { nome: "", note: "" };
        document.getElementById('nome-azienda').value = dati.nome;
        document.getElementById('note-azienda').value = dati.note;
        const vistaBox = document.getElementById('vista-intestazione');
        if (dati.nome !== "") {
            document.getElementById('print-nome-azienda').innerText = dati.nome;
            document.getElementById('print-note-azienda').innerText = dati.note;
            vistaBox.style.display = "block";
        } else { vistaBox.style.display = "none"; }
    },
    applica: function() {
        const nome = document.getElementById('nome-azienda').value.trim();
        const note = document.getElementById('note-azienda').value.trim();
        localStorage.setItem(this.chiaveStorage, JSON.stringify({ nome, note }));
        this.carica();
    }
};