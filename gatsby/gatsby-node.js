const path = require(`path`);
const queryAll = require(`./gatsby/queryAll.js`);

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions;

  if (
    node.internal.type === `entity` ||
    node.internal.type === `industry`
  ) {
    createNode({
      id: `md-${node.id}`,
      parent: node.id,
      children: [],
      internal: {
        type: `${node.internal.type}Markdown`,
        mediaType: `text/markdown`,
        content: node.pitch,
        contentDigest: node.internal.contentDigest
      }
    });
  }

  if (
    node.internal.type.toLowerCase() === `employee`
  ) {
    createNode({
      id: `md-${node.id}`,
      parent: node.id,
      children: [],
      internal: {
        type: `${node.internal.type}Markdown`,
        mediaType: `text/markdown`,
        content: node.bio,
        contentDigest: node.internal.contentDigest
      }
    });
  }

  if (
    node.internal.type.toLowerCase() === `proficiency`
  ) {
    createNode({
      id: `md-${node.id}`,
      parent: node.id,
      children: [],
      internal: {
        type: `${node.internal.type}Markdown`,
        mediaType: `text/markdown`,
        content: node.description,
        contentDigest: node.internal.contentDigest
      }
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const types = [
    {name: 'entity', hasMarkdown: true, dataKey: 'allEntity', path: '', idKey: 'slug'},
    {name: 'industry', hasMarkdown: true, dataKey: 'allIndustry', path: 'industries', idKey: 'slug'},
    {name: 'client', hasMarkdown: false, dataKey: 'allClient', path: 'clients', idKey: 'slug'},
    {name: 'proficiency', hasMarkdown: true, dataKey: 'allProficiency', path: 'proficiencies', idKey: 'slug'},
    {name: 'employee', hasMarkdown: true, dataKey: 'allEmployee', path: 'employees', idKey: 'slug'},
    {name: 'role', hasMarkdown: false, dataKey: 'allRole', path: 'roles', idKey: 'slug'},
    {name: 'officeLocation', hasMarkdown: false, dataKey: 'allOfficeLocation', path: 'locations', idKey: 'slug', templateName: 'office-location-detail.js'},
    {name: 'certification', hasMarkdown: false, dataKey: 'allCertification', path: 'certifications', idKey: 'id'},
    {name: 'project', hasMarkdown: false, dataKey: 'allProject', path: 'projects', idKey: 'id'}
  ]

  return new Promise((resolve, reject) =>
    graphql(queryAll)
      .then(result => 
        result.errors ? (
          reject(result.errors)
        ) : (
          types.forEach(type =>
            result.data[type.dataKey].edges.forEach(data =>
              createPage({
                path: `${type.path}/${data[type.name][type.idKey]}`,
                component: path.resolve(`./src/templates/${type.templateName || `${type.name}-detail.js`}`),
                context: {
                  id: data[type.name].id,
                  mdid: type.hasMarkdown ? `md-${data[type.name].id}` : undefined
                }
              })
            )
          )
        )
      )
      .then(() => 
        graphql(
          `
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    slug
                    title
                    content
                    excerpt
                    modified
                    date( formatString: "MM/DD/YYYY" )
                    featured_media {
                      localFile {
                        childImageSharp {
                          sizes( maxWidth: 2000 ) {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                          }
                        }
                      }
                    }
                    template
                    status
                  }
                }
              }
            }
          `
        )
      )
      .then(result => 
        result.errors ? (
          reject(result.errors)
        ) : (
          result.data.allWordpressPost.edges.forEach(edge =>
            createPage({
              path: `posts/${edge.node.slug}`,
              component: path.resolve("./src/templates/post-detail.js"),
              context: {
                id: edge.node.id,
              },
            })
          ) || resolve()
        )
      )
    )
};
