window.LinguaManager = {
    chiaveStorage: 'gelato_lingua',
    linguaCorrente: 'it',

    dizionario: {
        it: {
            lblCfgAzienda: "Configura Intestazione Azienda (Opzionale)",
            btnApplica: "Applica",
            titoloPrincipale: "Giornale di Produzione Gelato 🍦",
            btnStampa: "🖨️ Stampa / Salva in PDF",
            titoloGusti: "1. Gestione Lista Gusti",
            lblNuovoGusto: "Nuovo Gusto",
            btnAggiungi: "Aggiungi",
            lblGustiAttuali: "Gusti Attuali:",
            titoloProduzione: "2. Inserisci Produzione",
            lblData: "Data Produzione",
            lblGusto: "Gusto",
            lblQuantita: "Quantità (Litri)",
            lblLotto: "Lotto Ingredienti",
            btnRegistra: "Registra Produzione",
            btnApplicaModifiche: "Applica Modifiche",
            titoloRegistro: "Registro Giornaliero",
            thData: "Data",
            thGusto: "Gusto",
            thQuantita: "Quantità Prodotta",
            thLotto: "Lotto Base",
            thNote: "Note / Firma",
            thAzioni: "Azioni",
            tdTotale: "Totale Complessivo:",
            titoloBackup: "💾 Archivio e Salvataggio File Produzione",
            descBackup: "Scarica il file per salvare lo storico sul computer o caricalo per ripristinare i dati.",
            btnEsporta: "📥 Scarica File (.json)",
            btnImporta: "📤 Carica File Backup",
            alertCampi: "Compila tutti i campi inserendo una quantità valida.",
            confEliminaGusto: "Vuoi eliminare questo gusto?",
            confEliminaRiga: "Cancellare questa riga?",
            confImport: "Attenzione! Caricando questo file sovrascriverai i dati attuali. Vuoi procedere?",
            importSuccess: "Dati importati con successo!"
        },
        de: {
            lblCfgAzienda: "Unternehmensheader konfigurieren (Optional)",
            btnApplica: "Anwenden",
            titoloPrincipale: "Eisproduktionsbuch 🍦",
            btnStampa: "🖨️ Drucken / Als PDF speichern",
            titoloGusti: "1. Sortenliste verwalten",
            lblNuovoGusto: "Neue Eissorte",
            btnAggiungi: "Hinzufügen",
            lblGustiAttuali: "Aktuelle Sorten:",
            titoloProduzione: "2. Produktion eintragen",
            lblData: "Produktionsdatum",
            lblGusto: "Eissorte",
            lblQuantita: "Menge (Liter)",
            lblLotto: "Zutaten-Chargennummer",
            btnRegistra: "Produktion registrieren",
            btnApplicaModifiche: "Änderungen anwenden",
            titoloRegistro: "Tägliches Register",
            thData: "Datum",
            thGusto: "Eissorte",
            thQuantita: "Produzierte Menge",
            thLotto: "Basis-Charge",
            thNote: "Notizen / Unterschrift",
            thAzioni: "Aktionen",
            tdTotale: "Gesamtsumme:",
            titoloBackup: "💾 Archivierung und Speicherung der Produktionsdatei",
            descBackup: "Laden Sie die Datei herunter, um den Verlauf auf Ihrem Computer zu speichern, oder laden Sie sie hoch, um Daten wiederherzustellen.",
            btnEsporta: "📥 Datei herunterladen (.json)",
            btnImporta: "📤 Backup-Datei laden",
            alertCampi: "Bitte füllen Sie alle Felder aus und geben Sie eine gültige Menge ein.",
            confEliminaGusto: "Möchten Sie diese Sorte löschen?",
            confEliminaRiga: "Diese Zeile löschen?",
            confImport: "Achtung! Durch das Laden dieser Datei werden die aktuellen Daten überschrieben. Fortfahren?",
            importSuccess: "Daten erfolgreich importiert!"
        }
    },

    inizializza: function() {
        this.linguaCorrente = localStorage.getItem(this.chiaveStorage) || 'it';
        document.getElementById('lingua-select').value = this.linguaCorrente;
        this.traduciInterfaccia();
    },

    cambiaLingua: function(lingua) {
        this.linguaCorrente = lingua;
        localStorage.setItem(this.chiaveStorage, lingua);
        this.traduciInterfaccia();
        // Ricarica la tabella produzione per aggiornare eventuali scritte dinamiche
        if(window.ProdManager) window.ProdManager.renderTabella();
    },

    traduciInterfaccia: function() {
        const t = this.dizionario[this.linguaCorrente];
        
        document.getElementById('lbl-cfg-azienda').innerText = t.lblCfgAzienda;
        document.getElementById('btn-applica').innerText = t.btnApplica;
        document.getElementById('titolo-principale').innerText = t.titoloPrincipale;
        document.getElementById('btn-stampa').innerText = t.btnStampa;
        document.getElementById('titolo-gusti').innerText = t.titoloGusti;
        document.getElementById('lbl-nuovo-gusto').innerText = t.lblNuovoGusto;
        document.getElementById('btn-aggiungi').innerText = t.btnAggiungi;
        document.getElementById('lbl-gusti-attuali').innerText = t.lblGustiAttuali;
        document.getElementById('titolo-produzione').innerText = t.titoloProduzione;
        document.getElementById('lbl-data').innerText = t.lblData;
        document.getElementById('lbl-gusto').innerText = t.lblGusto;
        document.getElementById('lbl-quantita').innerText = t.lblQuantita;
        document.getElementById('lbl-lotto').innerText = t.lblLotto;
        
        const btnSalva = document.getElementById('btn-salva-prod');
        if(window.ProdManager && window.ProdManager.indiceModifica !== -1) {
            btnSalva.innerText = t.btnApplicaModifiche;
        } else {
            btnSalva.innerText = t.btnRegistra;
        }

        document.getElementById('titolo-registro').innerText = t.titoloRegistro;
        document.getElementById('th-data').innerText = t.thData;
        document.getElementById('th-gusto').innerText = t.thGusto;
        document.getElementById('th-quantita').innerText = t.thQuantita;
        document.getElementById('th-lotto').innerText = t.thLotto;
        document.getElementById('th-note').innerText = t.thNote;
        document.getElementById('th-azioni').innerText = t.thAzioni;
        document.getElementById('td-totale').innerText = t.tdTotale;
        
        document.getElementById('titolo-backup').innerText = t.titoloBackup;
        document.getElementById('desc-backup').innerText = t.descBackup;
        document.getElementById('btn-esporta').innerText = t.btnEsporta;
        document.getElementById('btn-importa').innerText = t.btnImporta;
    },

    getTesto: function(chiave) {
        return this.dizionario[this.linguaCorrente][chiave];
    }
};