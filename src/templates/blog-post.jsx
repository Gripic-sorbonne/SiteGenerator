// import { Link, graphql } from "gatsby"
// import * as React from 'react'
// import Layout from '../components/layout'
// import Markdown from 'react-markdown'
// import '../style/article.css'


// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const BlogPost = ({ data, children }) => {
//     const date = data.markdownRemark.fields.date
//     const { author, title, tags, abstract, sound } = data.markdownRemark.frontmatter
//     const authorName = author ? author : ""
    
//     return (
//         <Layout>
//             <main>
//                 {data.markdownRemark.tableOfContents && (<div id="toc-container">
//                     <nav dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }} />
//                 </div>)
//                 }
//                     <header id="article-header">
//                         <div className="overlay"> 
//                           <h1>{title}</h1>
//                           {author && !date && (<span id="article-meta">Publié par {authorName}</span>)}
//                           {author && date && (<span id="article-meta">Publié par {authorName} le {date}</span>)}
//                           <button className="button print" onClick={() => { window.print(); }}>&darr; Enregistrer au format pdf</button>
//                           {tags && (<div id="tags-container">
//                               {tags ? tags.map((el, i) => <a className="tag" key={i} >{el}</a>) : ''}
//                           </div>)}
//                         </div>
//                     </header>
//                 <div id="article-container">
//                     <article id="article">
//                         {abstract ? <aside><p><Markdown>{abstract}</Markdown></p></aside> : ''}
//                         {
//                             sound && (
//                                 <audio controls>
//                                     <source src={sound} type="audio/wav" />
//                                 </audio>
//                             )
//                         }
//                         <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
//                     </article>
//                 </div>
//             </main>
//         </Layout>
//     )
// }

// export const query = graphql`
//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title,
//       }
//     }
//     markdownRemark(fields: {slug: {eq: $slug}}) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       frontmatter {
//         author
//         title
//         tags
//         abstract
//         sound
//         uuid
//         prettyname
//         event
//         year
//       }
//       fields {
//         date(formatString: "DD MMMM, YYYY", locale: "fr")
//         slug
//         collection
//       }
//       tableOfContents
//     }
//   }
// `

// export default BlogPost


import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from 'react'
import Layout from '../components/layout'
import Markdown from 'react-markdown'
import '../style/article.css'

const BlogPost = ({ data, children }) => {
    const date = data.markdownRemark.fields.date
    const { author, title, tags, abstract, sound } = data.markdownRemark.frontmatter
    const featuredImage = getImage(data.markdownRemark.fields?.image)
    const authorName = author ? author : ""
    
    return (
        <Layout>
            <main>
                {data.markdownRemark.tableOfContents && (<div id="toc-container">
                    <nav dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }} />
                </div>)
                }
                    <header id="article-header">
                        <div className="overlay"> 
                          <h1>{title}</h1>
                          {author && !date && (<span id="article-meta">Publié par {authorName}</span>)}
                          {author && date && (<span id="article-meta">Publié par {authorName} le {date}</span>)}
                          <button className="button print" onClick={() => { window.print(); }}>&darr; Enregistrer au format pdf</button>
                          {tags && (<div id="tags-container">
                              {tags ? tags.map((el, i) => <a className="tag" key={i} >{el}</a>) : ''}
                          </div>)}
                        </div>
                    </header>
                <div id="article-container">
                    <article id="article">
                        {featuredImage && (
                            <div className="article-featured-image" style={{ marginBottom: "2rem" }}>
                                <GatsbyImage image={featuredImage} alt={title || "Illustration"} />
                            </div>
                        )}
                        {abstract ? <aside><p><Markdown>{abstract}</Markdown></p></aside> : ''}
                        {
                            sound && (
                                <audio controls>
                                    <source src={sound} type="audio/wav" />
                                </audio>
                            )
                        }
                        <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                    </article>
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title,
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        title
        tags
        abstract
        sound
        uuid
        prettyname
        event
        year
      }
      fields {
        date(formatString: "DD MMMM, YYYY", locale: "fr")
        slug
        collection
        image {
            childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR, width: 800)
            }
        }
      }
      tableOfContents
    }
  }
`

export default BlogPost