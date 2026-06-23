document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById('data')) {
        document.getElementById('data').valueAsDate = new Date();
    }
    
    // Inizializza prima la lingua, poi i moduli
    window.LinguaManager.inizializza();
    window.DittaManager.carica();
    window.GustiManager.inizializza();
    window.ProdManager.inizializza();
});