export function handleAlert(message, color) {
    if (document.getElementById("custom-alert-message")) {
        document.getElementById("custom-alert").style.display = "none";
        document.getElementById("custom-alert").style.backgroundColor = color;
        setTimeout(() => {
            document.getElementById("custom-alert-message").innerText = message;
            document.getElementById("custom-alert").style.display = "block";
        }, 50)
        
    }
}