'use strict'

module.exports = `
  {
    allProficiency {
      edges {
        proficiency: node {
          id
          slug
          name
          briefDescription
          description
          logo {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }

    allOfficeLocation {
      edges {
        officeLocation: node {
          id
          slug
          name
          address
          address2
          city
          state
          zip
          thumbnail {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
          photos {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
          employees {
            id
            name
            slug
          }
        }
      }
    }

    allCertification {
      edges {
        certification: node {
          id
          name
          description
          awardedOn
          media {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
          employees {
            id
            name
            slug
          }
        }
      }
    }

    allAward {
      edges {
        award: node {
          id
          name
          awardedOn
          media {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }

    allPublication(
      sort: { fields: [publishedOn], order: DESC}
    ) {
      edges {
        publication: node {
          id
          name
          description
          publishedOn
          links {
            id
            name
            url
          }
          thumbnail {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }

    allRole {
      edges {
        role: node {
          id
          slug
          description
          coverPhoto {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }
    
    allArticle {
      edges {
        article: node {
          id
          headline
          description
          url
          publishedOn
          source
        }
      }
    }

    allEntity {
      edges {
        entity: node {
          id
          slug
          pitch
          name
        }
      }
    }

    allClient {
      edges {
        client: node {
          id
          slug
        }
      }
    }

    allIndustry {
      edges {
        industry: node {
          id
          slug
          name
          description
          pitch
          clients {
            id
            slug
          }
          thumbnail {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
          photo {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }

    allProject {
      edges {
        project: node {
          id
        }
      }
    }

    allEmployee {
      edges {
        employee: node {
          id
          slug
          name
          title
          intro
          thumbnail {
            id
            title
            description
            file {
              id
              handle
              width
              height
            }
          }
        }
      }
    }
  }
`
