export function generateIssueNumber() {
    const chars = '0123456789';
    
    let rand = '';
    
    for (let i = 0; i < 5; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const year = new Date().getFullYear();
    
    return `ISS-${year}-${rand}`;
}
