import * as React from "react"
import { graphql } from "gatsby"
import { Card } from "../components/card"

export default function PublicationsTemplate({ data, pageContext }) {
  const allPosts = data.allMarkdownRemark.nodes
  
  // Filtrar de manera segura en JavaScript por el año correspondiente
  const posts = allPosts.filter(post => {
    const dateStr = post.frontmatter.date || post.fields?.date || ""
    return dateStr.includes(pageContext.year)
  })

  return (
    <main id="page-container">
      <div id="article-container">
        <h1>Publications : {pageContext.year}</h1>
        <div id="cards-container">
          {posts.map(post => (
            <Card key={post.id} postData={post} />
          ))}
        </div>
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query PublicationsByYear {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
          collection
          date
        }
        frontmatter {
          title
          abstract
          tags
          date
        }
      }
    }
  }
`