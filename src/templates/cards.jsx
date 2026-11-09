// import { graphql, Link } from "gatsby"
// import * as React from 'react'
// import { Card } from "../components/card"
// import Layout from '../components/layout'
// import { filterNodes } from "../helpers"
// import "../style/accueil.css"
// import "../style/cards.css"

// const CardsLayout = ({ data, pageContext }) => {
//     const { year, pageName } = pageContext;
//     const isEvents = pageName === "7_cards_événements" || pageName === "événements" || pageName?.includes("événements");
//     const basePath = isEvents ? "/événements" : "/publications";

//     // Filtrado robusto en JS para evitar conflictos con nombres largos o truncados de Excel
//     const allNodes = data.allMarkdownRemark.nodes.filter(n => {
//         if (n.fields.slug.startsWith('_')) return false;
//         if (!pageName) return true;
//         const col = n.fields.collection || "";
//         if (isEvents) {
//             return col.includes("événements") || col.includes("evenements");
//         }
//         return col === pageName || col.includes(pageName);
//     });

//     // 1. Extraer dinámicamente todos los años únicos disponibles
//     const availableYears = React.useMemo(() => {
//         const years = allNodes.map(node => {
//             if (node.frontmatter && node.frontmatter.year) return String(node.frontmatter.year);
//             if (node.fields && node.fields.date) {
//                 const match = node.fields.date.match(/\d{4}/);
//                 if (match) return match[0];
//             }
//             return null;
//         }).filter(Boolean);
//         return [...new Set(years)].sort((a, b) => b - a);
//     }, [allNodes]);

//     // 2. Si estamos en una vista de año específica, filtramos los nodos para ese año
//     const nodes = year 
//         ? allNodes.filter(node => String(node.frontmatter?.year) === String(year) || (node.fields?.date && node.fields.date.startsWith(String(year))))
//         : allNodes;

//     return (
//         <Layout nodes={nodes}>
//             {(toggleTag, tags, search) => {
//                 const filtered = filterNodes(nodes, search, tags);
//                 const description = allNodes.filter(node => node.fields.slug === "")[0]
                
//                 return (
//                     <div>
//                         {description && (
//                             <header id="cards-introduction">
//                                 <div
//                                     className="cards-introduction-content"
//                                     dangerouslySetInnerHTML={{ __html: description.html }}
//                                 />
//                             </header>
//                         )}

//                         {availableYears.length > 0 && (
//                             <div className="small-tags-container" style={{ margin: "1.5rem 0", textAlign: "center" }}>
//                                 <Link
//                                     to={`${basePath}/`}
//                                     className={"small-tag" + (!year ? " selected" : "")}
//                                     style={{ textDecoration: "none", display: "inline-block", margin: "4px" }}
//                                 >
//                                     Tous
//                                 </Link>
//                                 {availableYears.map(availableYear => (
//                                     <Link
//                                         key={availableYear}
//                                         to={`${basePath}/${availableYear}/`}
//                                         className={"small-tag" + (String(year) === String(availableYear) ? " selected" : "")}
//                                         style={{ textDecoration: "none", display: "inline-block", margin: "4px" }}
//                                     >
//                                         {availableYear}
//                                     </Link>
//                                 ))}
//                             </div>
//                         )}

//                         {year && (
//                             <div style={{ margin: "1rem 0", textAlign: "center" }}>
//                                 <h3>{isEvents ? "Événements" : "Publications"} pour l'année : {year}</h3>
//                                 <Link to={`${basePath}/`}>← Voir toutes les années</Link>
//                             </div>
//                         )}

//                         <div id="cards-container">
//                             {filtered.map(el => <Card key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
//                         </div>
//                     </div>
//                 )
//             }}
//         </Layout>
//     )
// }

// export const query = graphql`
//     query MyQuery {
//         allMarkdownRemark(
//             sort: {fields: {date: DESC}}
//             limit: 999
//         ) {
//             nodes {
//                 html
//                 frontmatter {
//                     tags
//                     title
//                     author
//                     abstract
//                     sound
//                     uuid
//                     prettyName
//                     year
//                     event
//                 }
//                 fields {
//                     collection
//                     date(formatString: "DD MMMM, YYYY", locale: "fr")
//                     slug
//                     image {
//                         childImageSharp {
//                             gatsbyImageData(placeholder: DOMINANT_COLOR, width: 400)
//                         }
//                     }
//                 }
//                 excerpt(pruneLength: 600)
//             }
//         }
//     }
// `

// export default CardsLayout



import { graphql, Link } from "gatsby"
import * as React from 'react'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/cards.css"

const CardsLayout = ({ data, pageContext }) => {
    const { year, pageName } = pageContext;
    const basePath = `/${pageName}`;

    const allNodes = data.allMarkdownRemark.nodes.filter(n => {
        if (n.fields.slug.startsWith('_')) return false;
        if (!pageName) return true;
        const col = n.fields.collection || "";
        return col === pageName || col.includes(pageName);
    });

    const availablePagingValues = React.useMemo(() => {
        const values = allNodes.map(node => {
            if (node.frontmatter && node.frontmatter.paging) return String(node.frontmatter.paging);
            if (node.frontmatter && node.frontmatter.year) return String(node.frontmatter.year);
            if (node.fields && node.fields.date) {
                const match = node.fields.date.match(/\d{4}/);
                if (match) return match[0];
            }
            return null;
        }).filter(Boolean);
        return [...new Set(values)].sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));
    }, [allNodes]);

    const nodes = year 
        ? allNodes.filter(node => 
            String(node.frontmatter?.paging) === String(year) || 
            String(node.frontmatter?.year) === String(year) || 
            (node.fields?.date && node.fields.date.startsWith(String(year)))
          )
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

                        {/* Menú desplegable superior para Paging */}
                        {availablePagingValues.length > 0 && (
                            <div className="paging-dropdown-container" style={{ margin: "1.5rem 0", textAlign: "center" }}>
                                <label htmlFor="paging-select" style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Filtrer par : </label>
                                <select 
                                    id="paging-select"
                                    value={year || ""} 
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "") {
                                            window.location.href = `${basePath}/`;
                                        } else {
                                            window.location.href = `${basePath}/${val}/`;
                                        }
                                    }}
                                    style={{ padding: "0.5rem 1rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
                                >
                                    <option value="">Tous</option>
                                    {availablePagingValues.map(pagingVal => (
                                        <option key={pagingVal} value={pagingVal}>
                                            {pagingVal}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {year && (
                            <div style={{ margin: "1rem 0", textAlign: "center" }}>
                                <h3>Filtre actif : {year}</h3>
                                <Link to={`${basePath}/`}>← Voir tout</Link>
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
    query MyQuery {
        allMarkdownRemark(
            sort: {fields: {date: DESC}}
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
                    paging
                    event
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