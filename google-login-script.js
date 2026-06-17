// Script per il login con Google - da aggiungere in index.html

// Configurazione Google OAuth
const GOOGLE_CLIENT_ID = 'INSERISCI_QUI_IL_TUO_CLIENT_ID';

// Funzione di callback quando l'utente si loga con Google
function handleCredentialResponse(response) {
    // Il token JWT viene decodificato dal browser
    const responsePayload = decodeJwtResponse(response.credential);
    
    const userEmail = responsePayload.email;
    const userName = responsePayload.name;
    
    // Salva in localStorage
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userToken', response.credential);
    localStorage.setItem('userName', userName);
    
    // Nascondi il bottone login e mostra il benvenuto
    document.getElementById('googleLoginContainer').style.display = 'none';
    document.getElementById('userLoggedIn').style.display = 'block';
    document.getElementById('userNameDisplay').textContent = userName;
    
    // Abilita i form
    document.querySelectorAll('.box-form').forEach(form => {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
    });
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    
    document.getElementById('googleLoginContainer').style.display = 'block';
    document.getElementById('userLoggedIn').style.display = 'none';
    
    // Disabilita i form
    document.querySelectorAll('.box-form').forEach(form => {
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';
    });
    
    // Reindirizza Google
    window.location.href = 'index.html';
}

// Inizializza al caricamento pagina
window.addEventListener('load', () => {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (userEmail && userName) {
        // Utente già loggato
        document.getElementById('googleLoginContainer').style.display = 'none';
        document.getElementById('userLoggedIn').style.display = 'block';
        document.getElementById('userNameDisplay').textContent = userName;
        document.getElementById('userEmailDisplay').textContent = userEmail;
        
        document.querySelectorAll('.box-form').forEach(form => {
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
        });
    } else {
        // Utente non loggato - disabilita form
        document.querySelectorAll('.box-form').forEach(form => {
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
        });
    }
    
    // Inizializza Google Sign-In
    if (window.google) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        );
    }
});
