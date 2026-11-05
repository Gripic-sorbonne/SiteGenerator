import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import { LongCard } from "../components/longcard"
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/long-cards.css"

const CardsLayout = ({ data, pageContext }) => {
    const nodes = data.allMarkdownRemark.nodes

    return (
        <Layout nodes={nodes}>
            {(toggleTag, tags, search) => {
                let filtered = filterNodes(nodes, search, tags);
                const description = nodes.filter(node => node.fields.slug === "")[0]

                const isMemberPage = pageContext?.pageName?.includes("membres") || 
                                     nodes.some(node => node.fields.collection?.includes("membres"));

                if (isMemberPage) {
                    filtered = [...filtered].sort((a, b) => 
                        a.fields.slug.localeCompare(b.fields.slug, undefined, { numeric: true, sensitivity: 'base' })
                    );
                }

                return (
                    <div>
                        {
                            description &&
                            (<header id="cards-introduction">
                                <div
                                    className="cards-introduction-content"
                                    dangerouslySetInnerHTML={{ __html: description.html }}
                                />
                            </header>
                            )
                        }
                        <div id="cards-container">
                            {filtered.map(el => <LongCard key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
                        </div>
                    </div>
                )
            }
            }
        </Layout>
    )
}

export const query = graphql`
    query MyQuery($pageName: String = "") {
        allMarkdownRemark(
        sort: [{fields: {date: DESC}}, {fields: {slug: ASC}}],
        filter: {fields: {collection: {eq: $pageName}}}
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

export default CardsLayout