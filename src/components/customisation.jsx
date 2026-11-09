export const Footer = () => (
    <footer id="footer">
        <div className="footer-block">
            <p><strong>GRIPIC</strong> — Groupe de recherche sur les enjeux de la communication</p>
            <p>CELSA Sorbonne Université</p>
            {/* Contenedor estricto para que el SVG respuepte sus proporciones sin desbordarse */}
            <div style={{ width: "160px", maxWidth: "100%", marginTop: "1rem" }}>
                <a href='https://lettres.sorbonne-universite.fr/' style={{ display: "block", textDecoration: "none" }}>
                    <img 
                        className="logo" 
                        src={LogoSorbonne} 
                        alt="Sorbonne Université" 
                        style={{ width: "100%", height: "auto", margin: 0, display: "block" }} 
                    />
                </a>
            </div>
        </div>
        <div className="footer-block">
            <p><strong>Pour nous rendre visite :</strong> 77, rue de Villiers, 92200 Neuilly-sur-Seine.</p>
            <p>Métro : "Pont de Levallois-Bécon" (ligne 3) ou "Pont-de-Neuilly" (ligne 1)</p>
            <p><strong>Pour nous contacter :</strong> <a href="mailto:contact@gripic.fr">contact@gripic.fr</a></p>
        </div>
    </footer>
)