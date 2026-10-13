import { graphql, Link } from "gatsby"
import * as React from 'react'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/cards.css"

const CardsLayout = ({ data, pageContext }) => {
    // Obtenemos todos los nodos (filtrando los que empiezan con guion bajo)
    const allNodes = data.allMarkdownRemark.nodes.filter(n => !n.fields.slug.startsWith('_'))
    const { year, pageName } = pageContext;

    const isEvents = pageName === "7_cards_événements" || pageName === "événements";
    const basePath = isEvents ? "/événements" : "/publications";

    // 1. Extraer dinámicamente todos los años únicos disponibles en la colección
    const availableYears = React.useMemo(() => {
        const years = allNodes.map(node => {
            if (node.frontmatter && node.frontmatter.year) return String(node.frontmatter.year);
            if (node.fields && node.fields.date) {
                const match = node.fields.date.match(/\d{4}/);
                if (match) return match[0];
            }
            return null;
        }).filter(Boolean);
        return [...new Set(years)].sort((a, b) => b - a); // Ordenar de más reciente a más antiguo
    }, [allNodes]);

    // 2. Si estamos en una subpágina de año específica, filtramos los nodos para ese año exacto
    const nodes = year 
        ? allNodes.filter(node => String(node.frontmatter?.year) === String(year))
        : allNodes;

    return (
        <Layout nodes={nodes}>
            {(toggleTag, tags, search) => {
                const filtered = filterNodes(nodes, search, tags);
                const description = allNodes.filter(node => node.fields.slug === "")[0]
                
                return (
                    <div>
                        {description && (
                            <header id="cards-introduction">
                                <div
                                    className="cards-introduction-content"
                                    dangerouslySetInnerHTML={{ __html: description.html }}
                                />
                            </header>
                        )}

                        {/* Menú de Pestañas / Enlaces de Navegación por Año */}
                        {availableYears.length > 0 && (
                            <div className="small-tags-container" style={{ margin: "1.5rem 0", textAlign: "center" }}>
                                <Link
                                    to={`${basePath}/`}
                                    className={"small-tag" + (!year ? " selected" : "")}
                                    style={{ textDecoration: "none", display: "inline-block", margin: "4px" }}
                                >
                                    Tous
                                </Link>
                                {availableYears.map(availableYear => (
                                    <Link
                                        key={availableYear}
                                        to={`${basePath}/${availableYear}/`}
                                        className={"small-tag" + (String(year) === String(availableYear) ? " selected" : "")}
                                        style={{ textDecoration: "none", display: "inline-block", margin: "4px" }}
                                    >
                                        {availableYear}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Indicador de la vista actual si hay un año seleccionado */}
                        {year && (
                            <div style={{ margin: "1rem 0", textAlign: "center" }}>
                                <h3>{isEvents ? "Événements" : "Publications"} pour l'année : {year}</h3>
                                <Link to={`${basePath}/`}>← Voir toutes les années</Link>
                            </div>
                        )}

                        <div id="cards-container">
                            {filtered.map(el => <Card key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
                        </div>
                    </div>
                )
            }}
        </Layout>
    )
}

export const query = graphql`
    query MyQuery($pageName: String = "") {
        allMarkdownRemark(
            sort: {fields: {date: DESC}},
            filter: {
                fields: {collection: {eq: $pageName}}
            }
            limit: 999
        ) {
            nodes {
                html
                frontmatter {
                    tags
                    title
                    author
                    abstract
                    sound
                    uuid
                    prettyName
                    year
                }
                fields {
                    collection
                    date(formatString: "DD MMMM, YYYY", locale: "fr")
                    slug
                    image {
                        childImageSharp {
                            gatsbyImageData(placeholder: DOMINANT_COLOR, width: 400)
                        }
                    }
                }
                excerpt(pruneLength: 600)
            }
        }
    }
`

export default CardsLayout