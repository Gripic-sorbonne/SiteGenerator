import * as React from 'react'

export const Introduction = () => {
    return (
        <div style={{ padding: "2rem", background: "#f0f0f0", textAlign: "center" }}>
            <h2>Introduction de prueba</h2>
        </div>
    )
}

export const Footer = () => (
    <footer id="footer" style={{ background: "red", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>¡PRUEBA DE FOOTER: SI VES ESTO EN ROJO, EL ARCHIVO RESPONDE!</h1>
    </footer>
)