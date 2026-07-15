export function generateAssetCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let rand = ''

    for (let i = 0; i < 6; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const year = new Date().getFullYear()
     
    return `AST-${year}-${rand}`;
}
