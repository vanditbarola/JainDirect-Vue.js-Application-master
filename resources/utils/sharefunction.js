
export function sendToWhatsApp(title, href) {
    const fullURL = 'https://jaindirect.frontend.bluerose.solutions' + href;
    const message = `Click on the below link to connect with ${title},\n${fullURL}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send/?text=${encodedMessage}`, '_blank');
}
