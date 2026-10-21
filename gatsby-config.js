
// const fs = require('fs')
// const path = require('path')

// const DIR = './src/data'
// const folders = fs.readdirSync(DIR)

// const siteConfig = JSON.parse(fs.readFileSync('siteConfig.json', 'utf8'));


// let config = {
//   siteMetadata: {
//     ...siteConfig,
//     authors: [
//     ],
//     pages: []
//   },
//   plugins: [
//     "gatsby-plugin-emotion",
//     "gatsby-plugin-image",
//     "gatsby-plugin-sitemap", {
//       resolve: 'gatsby-plugin-manifest',
//       options: {
//         "icon": "src/images/" + siteConfig['logo']
//       }
//     },
//     "gatsby-plugin-sharp",
//     "gatsby-transformer-sharp",
//     {
//       resolve: `gatsby-transformer-remark`,
//       options: {
//         gfm: true,
//         footnotes: true,
//         plugins: [
//           // `gatsby-remark-copy-linked-files`,
//           {
//             resolve: `gatsby-remark-copy-linked-files`,
//             options: {
//               ignoreFileExtensions: []
//             }
//           },
//           {
//             resolve: `gatsby-remark-responsive-iframe`,
//             // options: {
//             //   wrapperStyle: `margin-bottom: 1.0725rem`,
//             // },
//           },
//           `gatsby-remark-prismjs`,
//           `gatsby-remark-smartypants`,
//           `gatsby-remark-autolink-headers`
//         ],
//       },
//     },
//     {
//       resolve: 'gatsby-source-filesystem',
//       options: {
//         "name": "images",
//         "path": "./src/images/"
//       },
//       __key: "images"
//     }
//     // {
//     //   resolve: `gatsby-transformer-csv`,
//     // }
//   ],
// };

// console.log(folders)
// folders.forEach(folder => {
//   if(!folder.startsWith('_') && fs.statSync(path.join(DIR, folder)).isDirectory() && folder !== '.git' && folder !== ".github"){
//     config.plugins.push({
//       resolve: 'gatsby-source-filesystem', 
//       options: {
//         name: folder.split('_')[2], 
//         path: path.join(DIR, folder)}, 
//         // ignore: [`**/*.csv`, '*.csv', '**\\*.csv', '**\\*\.csv', '**\*.csv', path.join(DIR, folder, '2024-02-08_Tutoriel_tableau_Public', 'Fichier_Atelier.csv')]
//       })
//     config.siteMetadata.pages.push(folder)
//   }
// })


// module.exports = config

const fs = require('fs')
const path = require('path')

const DIR = './src/data'
const folders = fs.readdirSync(DIR)

const siteConfig = JSON.parse(fs.readFileSync('siteConfig.json', 'utf8'));

let config = {
  siteMetadata: {
    ...siteConfig,
    authors: [
    ],
    pages: []
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/" + siteConfig['logo']
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        footnotes: true,
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: []
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }
  ],
};

console.log(folders)

folders.forEach(folder => {
  const fullPath = path.join(DIR, folder);
  
  // Verificación estricta: que sea un directorio, no comience con '_' ni sea un archivo oculto/git
  if (
    !folder.startsWith('_') && 
    !folder.startsWith('.') && 
    fs.existsSync(fullPath) && 
    fs.statSync(fullPath).isDirectory() && 
    folder !== '.git' && 
    folder !== ".github"
  ) {
    // Parseo seguro con la nueva sintaxis: grupo__tipo__nombre
    const parts = folder.split('__');
    let type = parts.length > 1 ? parts[1] : '';

    // Si por alguna razón no tiene la estructura 'the__type__name', saltamos o asignamos un fallback seguro
    if (!type || type.trim() === '') {
      console.warn(`Aviso: La carpeta "${folder}" no cumple con el formato grupo__tipo__nombre.`);
      return; // Omitimos esta carpeta para que no rompa el plugin de filesystem
    }

    config.plugins.push({
      resolve: 'gatsby-source-filesystem', 
      options: {
        name: type, 
        path: fullPath
      }, 
    })
    config.siteMetadata.pages.push(folder)
  }
})