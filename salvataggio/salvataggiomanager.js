window.SalvataggioManager = {
    esportaDati: function() {
        const datiSalvataggio = {
            produzioni: localStorage.getItem('gelato_produzioni') || '[]',
            gusti: localStorage.getItem('gelato_gusti') || '[]',
            ditta: localStorage.getItem('gelato_ditta') || '{}'
        };

        const jsonString = JSON.stringify(datiSalvataggio, null, 2);
        // Utilizzo del Blob: Metodo universale compatibile al 100% con iOS Safari, Chrome e Android
        const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const downloadAnchor = document.createElement('a');
        const oggi = new Date().toISOString().slice(0,10);
        
        downloadAnchor.href = url;
        downloadAnchor.download = `backup_produzione_${oggi}.json`;
        
        // Cliccato e rimosso via codice, funziona su tutti i browser mobile
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        
        // Pulizia della memoria
        document.body.removeChild(downloadAnchor);
        URL.revokeObjectURL(url);
    },

    importaDati: function(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!confirm(window.LinguaManager.getTesto('confImport'))) {
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiCaricati = JSON.parse(e.target.result);
                
                if (datiCaricati.produzioni && datiCaricati.gusti) {
                    localStorage.setItem('gelato_produzioni', datiCaricati.produzioni);
                    localStorage.setItem('gelato_gusti', datiCaricati.gusti);
                    if(datiCaricati.ditta) localStorage.setItem('gelato_ditta', datiCaricati.ditta);
                    
                    alert(window.LinguaManager.getTesto('importSuccess'));
                    location.reload();
                } else {
                    alert("File non valido / Ungültige Datei");
                }
            } catch (err) {
                alert("Errore nel caricamento del file / Fehler beim Laden der Datei");
            }
        };
        reader.readAsText(file);
    }
};