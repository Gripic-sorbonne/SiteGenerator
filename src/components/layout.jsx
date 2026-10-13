// import { graphql, Link, useStaticQuery } from "gatsby"
// import { Footer } from '../components/customisation.jsx'
// import { transform } from 'lodash'
// import * as React from 'react'
// import '../style/footer.css'
// import '../style/general.css'
// import '../style/header.css'
// import '../style/navtag.css'
// import '../style/custom.css'

// // import { Link } from 'gatsby'

// const Layout = ({ children, nodes }) => {
//     const data = useStaticQuery(graphql`
//         query GetPages{
//             site {
//                 siteMetadata {
//                     title
//                     pages
//                 }
//             }
//             allMarkdownRemark {
//                 nodes {
//                   frontmatter {
//                     tags
//                   }
//                 }
//             }
//         }
//     `)

//     React.useEffect(() => {
//         document.title = data.site.siteMetadata.title
//     }, [])

//     const pages = data.site.siteMetadata.pages.map(page => {
//         const [group, _, name] = page.split('_')
//         return { name: name[0].toUpperCase() + name.slice(1), link: `/${name}/`, group }
//     })
//     // create menu
//     const menu = []
//     const orderedPages = [...pages].sort((el1, el2) => el1.group > el2.group)
//     let startPage = 1
//     orderedPages.forEach(page => {
//         if (page.group != startPage) {
//             menu.push({ name: '|' })
//             startPage = page.group
//         }
//         menu.push(page)
//     })

//     const nodesToUse = nodes ? nodes : data.allMarkdownRemark.nodes
//     const allTags = new Set(nodesToUse.map(el => el.frontmatter.tags).filter(el => el !== null).flat().sort())
//     // TODO: ajouter la requête graphql qui récupèrera le thésaurus
//     let [tags, setTags] = React.useState([]);
//     let [search, setSearch] = React.useState("");
//     let [open, setOpen] = React.useState(false);

//     const toggleTag = (tag, nav = false) => {
//         // TODO: ajouter coloration des enfants tags si il y en a
//         // si le tag est déjà sélectionné on le déselectionne
//         if (tags.indexOf(tag) !== -1) {
//             setTags(tags.filter(el => el !== tag))
//             // on referme le nav en déselectionnant le dernier tag sélectionné
//             if (open && !nav && tags.length === 1) {
//                 setOpen(false)
//             }
//         }
//         // sinon c'est l'inverse
//         else {
//             setTags([...tags, tag])
//             if (!open) {
//                 setOpen(true)
//             }
//         }
//     }
//     return (
//         <>
//             <LeftNav allTags={[...allTags]} selectedTags={tags} toggleTag={toggleTag} search={search} setSearch={setSearch} open={open} setOpen={setOpen} />
//             <div id="page-container">
//                 <Header menu={menu} />
//                 <main>
//                     {typeof children === "function" ? children(toggleTag, tags, search) : children}
//                 </main>
//                 <Footer />
//             </div>

//         </>
//     )
// }

// const Header = ({ menu }) => {

//     const [mode, setMode] = React.useState('light')

//     const toggleMode = () => {
//         let newMode = mode === 'dark' ? 'light' : 'dark'
//         setMode(newMode)
//     }

//     const changeColor = () => {
//         toggleMode()
//         let root = document.querySelector(':root')
//         root.style.setProperty('--main', colors[mode].main)
//         root.style.setProperty('--text-num', colors[mode]['text-num'])
//         root.style.setProperty('--bg-num', colors[mode]['bg-num'])
//     }

//     const colors = {
//         dark: {
//             'main': '132, 177, 255',
//             'text-num': '255',
//             'bg-num': '30'
//         },
//         light: {
//             'main': '0, 93, 255',
//             'text-num': '30',
//             'bg-num': '255'
//         }
//     }

//     return (
//         <header>
//             <nav id="header">
//                 <a className="header-link" id="header-logo" href="/">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16" style={{verticalAlign: 'baseline'}}>
//                         <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
//                     </svg>
//                 </a>
//                 {menu.map((el, i) => !el.link ? <hr className="header-div-v" key={i} /> : <Link className="header-link" key={i} to={el.link}>{el.name}</Link>)}
//                 <hr className="header-div-v" />
//             </nav>
//             <hr id="header-div-h" />
//         </header>
//     )
// }




// export const Tag = ({ tagName, selectedTags, toggleTag, nav = false }) =>
//     <a className={"small-tag" + (selectedTags.indexOf(tagName) !== -1 ? " selected" : "")} onClick={() => toggleTag(tagName, nav)}>{tagName}</a>


// const LeftNav = ({ allTags, open, setOpen, selectedTags, toggleTag, search, setSearch }) => {
//     return (
//         <div id="tags-panel-container" style={{ left: open ? '0rem' : '-17rem', 'paddingRight': open ? '1rem' : '0.5rem' }}>
//             <nav id="tags-panel">
//                 <div id="title-button-container">
//                     <p style={{ visibility: open ? 'visible' : 'hidden' }}>
//                         <strong>Recherche de contenus par concepts</strong>
//                     </p>
//                     <button className="discrete-button" onClick={() => setOpen(!open)}>
//                         <div style={{ fontSize: open ? '1rem' : '1.4rem', transform: open ? 'none' : 'rotate(50deg)' }}> {open ? '\u2190' : '\u26b2'} </div>
//                     </button>
//                 </div>
//                 <div id="tags-panel-text" style={{ visibility: open ? 'visible' : 'hidden' }}>
//                     <input type="text" placeholder="Recherche dans le texte" value={search} onChange={(e) => setSearch(e.target.value)} />
//                 </div>
//                 <hr style={{ visibility: open ? 'visible' : 'hidden' }} />
//                 <div id="tags-panel-tree" style={{ visibility: open ? 'visible' : 'hidden' }}>
//                     {/* <div className="parent-tag-container">
//                         <Tag tagName="toto" selectedTags={selectedTags} toggleTag={toggleTag} nav={true}/>
//                         <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
//                     </div> */}
//                     <div className="wild-tags">
//                         {allTags.map((el, id) => <Tag tagName={el} selectedTags={selectedTags} toggleTag={toggleTag} nav={true} key={id} />)}
//                     </div>
//                     {/* <div className="parent-tag-container">
//                         <a className="small-tag" onclick="select_tag(this)">Climate</a>
//                         <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
//                     </div> */}
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Layout


import { graphql, Link, useStaticQuery } from "gatsby"
import { Footer } from '../components/customisation.jsx'
import { transform } from 'lodash'
import * as React from 'react'
import '../style/footer.css'
import '../style/general.css'
import '../style/header.css'
import '../style/navtag.css'
import '../style/custom.css'

const Layout = ({ children, nodes }) => {
    const data = useStaticQuery(graphql`
        query GetPages{
            site {
                siteMetadata {
                    title
                    pages
                }
            }
            allMarkdownRemark {
                nodes {
                  frontmatter {
                    tags
                  }
                }
            }
        }
    `)

    React.useEffect(() => {
        document.title = data.site.siteMetadata.title
    }, [])

    const pages = data.site.siteMetadata.pages.map(page => {
        const [group, _, name] = page.split('_')
        return { name: name[0].toUpperCase() + name.slice(1), link: `/${name}/`, group }
    })

    // Agrupar páginas por su número de grupo
    const groupedPagesObj = pages.reduce((acc, page) => {
        if (!acc[page.group]) {
            acc[page.group] = []
        }
        acc[page.group].push(page)
        return acc
    }, {})

    // Convertir el objeto agrupado en un array ordenado por grupo
    const menuGroups = Object.keys(groupedPagesObj)
        .sort()
        .map(groupKey => ({
            group: groupKey,
            items: groupedPagesObj[groupKey]
        }))

    const nodesToUse = nodes ? nodes : data.allMarkdownRemark.nodes
    const allTags = new Set(nodesToUse.map(el => el.frontmatter.tags).filter(el => el !== null).flat().sort())
    
    let [tags, setTags] = React.useState([]);
    let [search, setSearch] = React.useState("");
    let [open, setOpen] = React.useState(false);

    const toggleTag = (tag, nav = false) => {
        if (tags.indexOf(tag) !== -1) {
            setTags(tags.filter(el => el !== tag))
            if (open && !nav && tags.length === 1) {
                setOpen(false)
            }
        }
        else {
            setTags([...tags, tag])
            if (!open) {
                setOpen(true)
            }
        }
    }

    return (
        <>
            <LeftNav allTags={[...allTags]} selectedTags={tags} toggleTag={toggleTag} search={search} setSearch={setSearch} open={open} setOpen={setOpen} />
            <div id="page-container">
                <Header menuGroups={menuGroups} />
                <main>
                    {typeof children === "function" ? children(toggleTag, tags, search) : children}
                </main>
                <Footer />
            </div>
        </>
    )
}

const Header = ({ menuGroups }) => {
    const [mode, setMode] = React.useState('light')

    const toggleMode = () => {
        let newMode = mode === 'dark' ? 'light' : 'dark'
        setMode(newMode)
    }

    const changeColor = () => {
        toggleMode()
        let root = document.querySelector(':root')
        root.style.setProperty('--main', colors[mode].main)
        root.style.setProperty('--text-num', colors[mode]['text-num'])
        root.style.setProperty('--bg-num', colors[mode]['bg-num'])
    }

    const colors = {
        dark: {
            'main': '132, 177, 255',
            'text-num': '255',
            'bg-num': '30'
        },
        light: {
            'main': '0, 93, 255',
            'text-num': '30',
            'bg-num': '255'
        }
    }

    const getGroupTitle = (groupKey) => {
        if (groupKey === "0") return "Le Laboratoire";
        return `Section ${groupKey}`;
    }

    return (
        <header>
            <nav id="header" className="d-flex align-items-center">
                <a className="header-link" id="header-logo" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16" style={{verticalAlign: 'baseline'}}>
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                </a>
                
                <hr className="header-div-v" />

                {menuGroups.map((groupObj, index) => {
                    const { group, items } = groupObj;

                    return (
                        <React.Fragment key={group}>
                            {items.length > 1 ? (
                                <div className="dropdown d-inline-block position-relative mx-2">
                                    <button 
                                        className="header-link dropdown-toggle bg-transparent border-0 text-decoration-none" 
                                        type="button" 
                                        id={`dropdownMenuButton-${group}`}
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {getGroupTitle(group)}
                                    </button>
                                    <ul className="dropdown-menu shadow-sm border-0 mt-2" aria-labelledby={`dropdownMenuButton-${group}`}>
                                        {items.map((item, idx) => (
                                            <li key={idx}>
                                                <Link className="dropdown-item py-2" to={item.link}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                /* Si el grupo tiene un solo elemento, se pinta como enlace directo */
                                <Link className="header-link" to={items[0].link}>
                                    {items[0].name}
                                </Link>
                            )}

                            <hr className="header-div-v" />
                        </React.Fragment>
                    );
                })}
            </nav>
            <hr id="header-div-h" />
        </header>
    )
}

export const Tag = ({ tagName, selectedTags, toggleTag, nav = false }) =>
    <a className={"small-tag" + (selectedTags.indexOf(tagName) !== -1 ? " selected" : "")} onClick={() => toggleTag(tagName, nav)}>{tagName}</a>

const LeftNav = ({ allTags, open, setOpen, selectedTags, toggleTag, search, setSearch }) => {
    return (
        <div id="tags-panel-container" style={{ left: open ? '0rem' : '-17rem', 'paddingRight': open ? '1rem' : '0.5rem' }}>
            <nav id="tags-panel">
                <div id="title-button-container">
                    <p style={{ visibility: open ? 'visible' : 'hidden' }}>
                        <strong>Recherche de contenus par concepts</strong>
                    </p>
                    <button className="discrete-button" onClick={() => setOpen(!open)}>
                        <div style={{ fontSize: open ? '1rem' : '1.4rem', transform: open ? 'none' : 'rotate(50deg)' }}> {open ? '\u2190' : '\u26b2'} </div>
                    </button>
                </div>
                <div id="tags-panel-text" style={{ visibility: open ? 'visible' : 'hidden' }}>
                    <input type="text" placeholder="Recherche dans le texte" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <hr style={{ visibility: open ? 'visible' : 'hidden' }} />
                <div id="tags-panel-tree" style={{ visibility: open ? 'visible' : 'hidden' }}>
                    <div className="wild-tags">
                        {allTags.map((el, id) => <Tag tagName={el} selectedTags={selectedTags} toggleTag={toggleTag} nav={true} key={id} />)}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Layout