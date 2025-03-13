async function generateSitemap() {
    const baseUrl = "https://digitaldatasolutions.ca/articles.html?id=";

    try {
        const response = await fetch('/articles.json');
        const data = await response.json();
        const articles = data.articles;

        let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        // Ajouter la page d'accueil
        sitemapContent += `
            <url>
                <loc>https://digitaldatasolutions.ca/</loc>
                <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>\n`;

        // Ajouter les articles au sitemap
        articles.forEach(article => {
            sitemapContent += `
            <url>
                <loc>${baseUrl}${article.id}</loc>
                <lastmod>${article.date}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>\n`;
        });

        sitemapContent += `</urlset>`;

        // Mettre à jour le fichier sitemap.xml sur Netlify
        const blob = new Blob([sitemapContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Afficher l'URL pour téléchargement manuel (ou envoyer vers Netlify)
        console.log("Sitemap généré :", url);

        // Ajouter un lien de téléchargement sur la page (optionnel)
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = "sitemap.xml";
        downloadLink.textContent = "Télécharger le nouveau Sitemap";
        document.body.appendChild(downloadLink);
    } catch (error) {
        console.error("Erreur lors de la génération du sitemap :", error);
    }
}

// Exécuter la fonction quand la page se charge
window.onload = generateSitemap;
