// import { graphql } from "gatsby"
// import * as React from 'react'
// import Layout from '../components/layout'
// import { LongCard } from "../components/longcard"
// import { filterNodes } from "../helpers"
// import "../style/accueil.css"
// import "../style/long-cards.css"

// const CardsLayout = ({ data, pageContext }) => {
//     const nodes = data.allMarkdownRemark.nodes

//     return (
//         <Layout nodes={nodes}>
//             {(toggleTag, tags, search) => {
//                 let filtered = filterNodes(nodes, search, tags);
//                 const description = nodes.filter(node => node.fields.slug === "")[0]

//                 const isMemberPage = pageContext?.pageName?.includes("membres") || 
//                                      nodes.some(node => node.fields.collection?.includes("membres"));

//                 if (isMemberPage) {
//                     filtered = [...filtered].sort((a, b) => 
//                         a.fields.slug.localeCompare(b.fields.slug, undefined, { numeric: true, sensitivity: 'base' })
//                     );
//                 }

//                 return (
//                     <div>
//                         {
//                             description &&
//                             (<header id="cards-introduction">
//                                 <div
//                                     className="cards-introduction-content"
//                                     dangerouslySetInnerHTML={{ __html: description.html }}
//                                 />
//                             </header>
//                             )
//                         }
//                         <div id="cards-container">
//                             {filtered.map(el => <LongCard key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
//                         </div>
//                     </div>
//                 )
//             }
//             }
//         </Layout>
//     )
// }

// export const query = graphql`
//     query MyQuery($pageName: String = "") {
//         allMarkdownRemark(
//         sort: [{fields: {date: DESC}}, {fields: {slug: ASC}}],
//         filter: {fields: {collection: {eq: $pageName}}}
//         limit: 999
//         ) {
//         nodes {
//             html
//             frontmatter {
//                 tags
//                 title
//                 author
//                 abstract
//                 sound
//                 uuid
//                 prettyname
//                 year
//                 event
//             }
//             fields {
//             date(formatString: "DD MMMM, YYYY", locale: "fr")
//             slug
//             collection
//             image {
//                     childImageSharp {
//                         gatsbyImageData(placeholder: TRACED_SVG, width: 400)
//                     }
//                 }
//             }
//             excerpt(pruneLength: 600)
//         }
//     }
// }
// `

// export default CardsLayout





import { graphql, Link } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import { LongCard } from "../components/longcard"
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/long-cards.css"

const LongCardsLayout = ({ data, pageContext }) => {
    const { year, pageName } = pageContext;
    const basePath = `/${pageName}`;

    const allNodes = data.allMarkdownRemark.nodes.filter(n => {
        if (n.fields.slug.startsWith('_')) return false;
        if (!pageName) return true;
        const col = n.fields.collection || "";
        return col === pageName || col.includes(pageName);
    });

    // ESTRICTO: Extraer únicamente valores de _paging definidos en el frontmatter
    const availablePagingValues = React.useMemo(() => {
        const values = allNodes
            .map(node => node.frontmatter?.paging ? String(node.frontmatter.paging).trim() : null)
            .filter(Boolean);
        return [...new Set(values)].sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));
    }, [allNodes]);

    let nodes = year 
        ? allNodes.filter(node => String(node.frontmatter?.paging) === String(year))
        : allNodes;

    const isMemberPage = pageContext?.pageName?.includes("membres") || 
                         nodes.some(node => node.fields.collection?.includes("membres"));

    if (isMemberPage) {
        nodes = [...nodes].sort((a, b) => 
            a.fields.slug.localeCompare(b.fields.slug, undefined, { numeric: true, sensitivity: 'base' })
        );
    }

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

                        {/* El menú desplegable SOLO aparece si el usuario definió _paging */}
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
                            {filtered.map(el => <LongCard key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
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
            sort: [{fields: {date: DESC}}, {fields: {slug: ASC}}]
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
                    prettyname
                    paging
                    event
                }
                fields {
                    date(formatString: "DD MMMM, YYYY", locale: "fr")
                    slug
                    collection
                    image {
                        childImageSharp {
                            gatsbyImageData(placeholder: TRACED_SVG, width: 400)
                        }
                    }
                }
                excerpt(pruneLength: 600)
            }
        }
    }
`

export default LongCardsLayout