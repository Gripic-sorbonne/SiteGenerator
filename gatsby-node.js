// const { createFilePath } = require(`gatsby-source-filesystem`)
// const path = require(`path`)
// const fs = require('fs')
// const csv = require('csv-parser')

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
  
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode }).replace('/', '')
    
//     createNodeField({
//       node: node,
//       name: `slug`,
//       value: slug,
//     })
    
//     const date = slug.split('_')[0]

//     if(date.match(/\d{4}-\d{2}-\d{2}/)){
//       createNodeField({
//         node: node,
//         name: `date`,
//         value: date,
//       })
//     }

//     const parent = getNode(node.parent)
//     const collection = parent.sourceInstanceName

//     createNodeField({
//       node: node,
//       name: `collection`,
//       value: collection,
//     })

//     let images = []
//     if(node.frontmatter.image){
//       images = [path.join(path.dirname(node.fileAbsolutePath), node.frontmatter.image)]
//     }
//     else{
//       const files = fs.readdirSync(path.dirname(node.fileAbsolutePath)).filter(el => el !== 'index.md')
//       images = files.filter(el => el.endsWith('.png') || el.endsWith('.jpeg') || el.endsWith('.jpg') || el.endsWith('.webp'))
//     }
    
//     createNodeField({
//       node: node,
//       name: "image",
//       value: images[0] ?? null
//     })
//   }
// }

// exports.createPages = async ({ graphql, actions }) => {
//   const dict_prettyNames = {}
//   const { createPage } = actions

//   const result = await graphql(
//     `
//       {
//         site {
//           siteMetadata {
//             pages
//           }
//         }
//         allMarkdownRemark(sort: {fields: {date: DESC}}, limit: 999) {
//           edges {
//             node {
//               fields {
//                 slug
//                 date
//                 collection
//               }
//               frontmatter {
//                 title
//                 uuid
//                 prettyName
//                 year
//               }
//             }
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     throw result.errors
//   }

//   // 1. Creer pages principaux du menu basees en siteMetadata
//   const pagesToCreate = result.data.site.siteMetadata.pages

//   pagesToCreate.forEach(page => {
//     const [_, template, pageName] = page.split('_')

//     createPage({
//       path: `/${pageName}/`,
//       component: path.resolve(`./src/templates/${template}.jsx`),
//       context: {
//         pageName: pageName,
//         year: null // Aseguramos que la vista principal no tenga filtro de año
//       },
//     })
//   })

//   result.data.allMarkdownRemark.edges.forEach((edge) => {
//     const fields = edge.node.fields;
//     const uuid = edge.node.frontmatter.uuid;
//     const prettyName = edge.node.frontmatter.prettyName;

//     if(fields.slug === "") return

//     createPage({
//       path: `/${uuid}`,
//       component: path.resolve(`./src/templates/blog-post.jsx`),
//       context: { slug: fields.slug },
//     })

//     if (prettyName) {
//       if (prettyName in dict_prettyNames) {
//         throw Error(`Pretty name ${prettyName} already exists`);
//       }
//       dict_prettyNames[prettyName] = uuid
//       createPage({
//           path: `/${prettyName}`,
//           component: path.resolve(`./src/templates/blog-post.jsx`),
//           context: { slug: fields.slug },
//       })
//       createPage({
//           path: `/${prettyName}/`.toLowerCase(),
//           component: path.resolve(`./src/templates/blog-post.jsx`),
//           context: { slug: fields.slug },
//       })
//     }
//   })

//   ////////////////////////////////////////////////////////////////////////////////
//   // 3. PAGING
//   ////////////////////////////////////////////////////////////////////////////////

//   const allEdges = result.data.allMarkdownRemark.edges

//   // A. Publicaciones por año (usando cards.jsx en lugar de publications.jsx)
//   const publicationsEdges = allEdges.filter(
//     edge => edge.node.fields.collection === "1_cards_publications" || edge.node.fields.collection?.includes("publications")
//   )
//   const pubYears = [...new Set(publicationsEdges.map(e => {
//     if (e.node.frontmatter.year) return String(e.node.frontmatter.year);
//     if (e.node.fields.date) return e.node.fields.date.substring(0, 4);
//     return null;
//   }).filter(Boolean))];

//   pubYears.forEach(year => {
//     createPage({
//       path: `/publications/${year}/`,
//       component: path.resolve(`./src/templates/cards.jsx`),
//       context: {
//         pageName: "1_cards_publications",
//         year: year,
//       },
//     })
//   })

//   // B. Eventos por año
//   const eventsEdges = allEdges.filter(
//     edge => edge.node.fields.collection === "7_cards_événements" || edge.node.fields.collection?.includes("événements")
//   )
//   const eventYears = [...new Set(eventsEdges.map(e => {
//     if (e.node.frontmatter.year) return String(e.node.frontmatter.year);
//     if (e.node.fields.date) return e.node.fields.date.substring(0, 4);
//     return null;
//   }).filter(Boolean))];

//   eventYears.forEach(year => {
//     createPage({
//       path: `/événements/${year}/`,
//       component: path.resolve(`./src/templates/cards.jsx`),
//       context: {
//         pageName: "7_cards_événements",
//         year: year,
//       },
//     })
//   })
// }

// // DEFINITION DU ESQUEMA GRAPHQL
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: MarkdownRemarkFields
//     }
//     type MarkdownRemarkFields {
//       slug: String,
//       date: Date @dateformat
//       collection: String
//     }
//     type Frontmatter {
//       tags: [String!]
//       sound: String
//       author: String
//       title: String!
//       event: Boolean,
//       uuid: String!,
//       prettyName: String,
//       year: String
//     }
//   `
//   createTypes(typeDefs)
// }



const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require('fs')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode }).replace('/', '')
    
    createNodeField({
      node: node,
      name: `slug`,
      value: slug,
    })
    
    const date = slug.split('_')[0]
    if(date.match(/\d{4}-\d{2}-\d{2}/)){
      createNodeField({
        node: node,
        name: `date`,
        value: date,
      })
    }

    const parent = getNode(node.parent)
    const collection = parent.sourceInstanceName

    createNodeField({
      node: node,
      name: `collection`,
      value: collection,
    })

    let images = []
    if(node.frontmatter.image){
      images = [path.join(path.dirname(node.fileAbsolutePath), node.frontmatter.image)]
    }
    else{
      const files = fs.readdirSync(path.dirname(node.fileAbsolutePath)).filter(el => el !== 'index.md')
      images = files.filter(el => el.endsWith('.png') || el.endsWith('.jpeg') || el.endsWith('.jpg') || el.endsWith('.webp'))
    }
    
    createNodeField({
      node: node,
      name: "image",
      value: images[0] ?? null
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const dict_prettyNames = {}
  const { createPage } = actions

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            pages
          }
        }
        allMarkdownRemark(sort: {fields: {date: DESC}}, limit: 999) {
          edges {
            node {
              fields {
                slug
                date
                collection
              }
              frontmatter {
                title
                uuid
                prettyName
                year
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const pagesToCreate = result.data.site?.siteMetadata?.pages || []

  pagesToCreate.forEach(page => {
    // Quitamos el prefijo numérico si existe (ej: "01_activite..." -> "activite...")
    const cleanPage = page.replace(/^\d+_/, '')
    const parts = cleanPage.split('__')
    const template = parts.length > 1 ? parts[1] : 'cards'
    const pageName = parts.length > 2 ? parts[2] : parts[0]

    createPage({
      path: `/${pageName}/`,
      component: path.resolve(`./src/templates/${template}.jsx`),
      context: {
        pageName: pageName,
        year: null 
      },
    })
  })

  result.data.allMarkdownRemark.edges.forEach((edge) => {
    const fields = edge.node.fields;
    const uuid = edge.node.frontmatter.uuid;
    const prettyName = edge.node.frontmatter.prettyName;

    if(fields.slug === "") return

    createPage({
      path: `/${uuid}`,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: { slug: fields.slug },
    })

    if (prettyName) {
      if (prettyName in dict_prettyNames) {
        throw Error(`Pretty name ${prettyName} already exists`);
      }
      dict_prettyNames[prettyName] = uuid
      createPage({
          path: `/${prettyName}`,
          component: path.resolve(`./src/templates/blog-post.jsx`),
          context: { slug: fields.slug },
      })
      createPage({
          path: `/${prettyName}/`.toLowerCase(),
          component: path.resolve(`./src/templates/blog-post.jsx`),
          context: { slug: fields.slug },
      })
    }
  })

  const allEdges = result.data.allMarkdownRemark.edges

  const publicationsEdges = allEdges.filter(
    edge => edge.node.fields.collection === "publications" || edge.node.fields.collection?.includes("publications")
  )
  const pubYears = [...new Set(publicationsEdges.map(e => {
    if (e.node.frontmatter.year) return String(e.node.frontmatter.year);
    if (e.node.fields.date) return e.node.fields.date.substring(0, 4);
    return null;
  }).filter(Boolean))];

  pubYears.forEach(year => {
    createPage({
      path: `/publications/${year}/`,
      component: path.resolve(`./src/templates/cards.jsx`),
      context: {
        pageName: "publications",
        year: year,
      },
    })
  })

  const eventsEdges = allEdges.filter(
    edge => edge.node.fields.collection === "événements" || edge.node.fields.collection?.includes("événements")
  )
  const eventYears = [...new Set(eventsEdges.map(e => {
    if (e.node.frontmatter.year) return String(e.node.frontmatter.year);
    if (e.node.fields.date) return e.node.fields.date.substring(0, 4);
    return null;
  }).filter(Boolean))];

  eventYears.forEach(year => {
    createPage({
      path: `/événements/${year}/`,
      component: path.resolve(`./src/templates/cards.jsx`),
      context: {
        pageName: "événements",
        year: year,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type SiteSiteMetadata {
      title: String
      description: String
      author: String
      logo: String
      pages: [String]
    }

    type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
      fields: MarkdownRemarkFields
    }

    type MarkdownRemarkFields @infer {
      slug: String
      date: Date @dateformat
      collection: String
      image: String
    }

    type Frontmatter @infer {
      title: String
      tags: [String]
      sound: String
      author: String
      authors: String
      abstract: String
      date: Date @dateformat
      year: String
      type: String
      url: String
      publisher: String
      container_title: String
      event: Boolean
      uuid: String
      prettyName: String
      image: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}