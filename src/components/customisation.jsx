import * as React from 'react'
import LogoSorbonne from '../images/logo.svg'

export const Introduction = () => { return (
    <div className="landing-block text">
        <h2>Template de site académique de la Fac de Lettres</h2>
        <p>
            Ce site est un modèle pour les sites de laboratoire de <a href="https://lettres.sorbonne-universite.fr/">Faculté des Lettres de Sorbonne Université</a>.
                Il a pour vocation d'être un exemple modifiable afin de mettre en place aisément des sites web permettant de publier billets de blogs et mettre en avant des événements liés à l'activité d'un laboratoire.
        </p>
        <p>
            Fonctionnalités principales
            <ul>
                <li> Publier du contenu à partir de simples fichiers markdown </li>
                <li> Mise en avant d'événements </li>
                <li> Gestion facilitée de membres </li>
            </ul>
        </p>
        <p>
            Ce template a été créé par les ingénieurs de <a href="ceres.sorbonne-universite.fr">l'unité de service du CERES</a>.
        </p>
    </div>
)}

export const Footer = () => (
    <footer id="footer">
        <div className="footer-block">
            <p>CERES — Centre d'expérimentation en méthodes numériques pour les recherches en sciences humaines et
                sociales</p>
            <p>Faculté des Lettres de Sorbonne Université</p>
            <a href='https://lettres.sorbonne-universite.fr/' style={{ width: "40%", display: "inline-block"}}>
                <img className="logo" src={LogoSorbonne} style={{ maxWidth: "100%", margin: 0, height: "194px", width: "500px" }} />
            </a>
        </div>
        <div className="footer-block">
            <p> Pour nous rendre visite : Maison de la Recherche, 28 rue Serpente,
                75006 Paris, Bureau S007.
            </p>
            <p>Pour nous contacter : <a href="mailto: contact@gripic.fr"> contact@gripic.fr</a></p>
        </div>
    </footer>)