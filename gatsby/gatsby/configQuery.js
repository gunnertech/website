module.exports = `{
  allCertifications: certifications {
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
      intro
      title
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

  allOfficeLocations: officeLocations {
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

  allPublications: publications(orderBy: publishedOn_DESC) {
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

  articles(orderBy: publishedOn_DESC) {
    id
    headline
    description
    url
    publishedOn
    source
    coverPhoto {
      id
      title
      file {
        id
        handle
        width
        height
      }
    }
    sourceObj {
      id
      name
      slug
      logo {
        id
        title
        file {
          id
          handle
          width
          height
        }
      }
    }
  }

  entities(orderBy: createdAt_DESC) {
    id
    slug
    name
    description
    pitch
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
    clients(orderBy: position_ASC) {
      id
      slug
      name
      description
      position
      hiredOn
      industries {
        id
        slug
        name
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

  allEmployees: employees {
    id
    slug
    name
    active
    hiredOn
    position
    intro
    bio
    title
    videoUrl
    endDate
    certifications {
      id
      name
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
    officeLocation {
      id
      slug
      name
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
    proficiencies {
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
    projectRoles {
      id
      project {
        id
        title
        startDate
        projectedLaunchDate
        actualLaunchDate
        projectRoles {
          id
          employee {
            id
          }
          role {
            id
            slug
            name
          }
        }
        client {
          id
          slug
          name
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
      role {
        id
        slug
        name
      }
    }
  }

  allRoles: roles {
    id
    slug
    name
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
    projectRoles {
      id
      project {
        id
        title
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
        client {
          id
          slug
          name
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
      employee {
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

  allAwards: awards {
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
  }

  allClients: clients {
    id
    slug
    name
    description
    position
    hiredOn
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
    projects {
      id
      title
      startDate
      projectedLaunchDate
      actualLaunchDate
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
    entities {
      id
      slug
      name
    }

    industries {
      id
      slug
      name
      description
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

  industries(orderBy: createdAt_DESC) {
    id
    slug
    name
    description
    pitch
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
    clients {
      id
      slug
      name
      description
      position
      hiredOn
      industries {
        id
        slug
        name
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

  proficiencies(first: 1000) {
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
    links {
      id
      name
      url
    }
    companyLogos {
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
      intro
      title
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
    projects {
      id
      title
      startDate
      projectedLaunchDate
      actualLaunchDate
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
      client {
        id
        slug
        name
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
        industries {
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
          name
          id
          slug
        }
      }
    }
  }

  allProjects: projects(orderBy: startDate_DESC) {
    id
    title
    startDate
    projectedLaunchDate
    actualLaunchDate
    compensation
    problemStatement
    solutionStatement
    challengeStatement
    technicalApproach
    projectManagementApproach
    lessonsLearned
    benefits
    pitch
    architecturalDescription
    teamDiscussionVideoUrl
    caseStudyVideoUrl
    public
    position
    briefDescription
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
    screenshots {
      title
      description
      file {
        id
        handle
        width
        height
      }
    }
    wireframes {
      title
      description
      file {
        id
        handle
        width
        height
      }
    }
    architecturalDiagrams {
      title
      description
      file {
        id
        handle
        width
        height
      }
    }
    client {
      name
      slug
      id
      industries {
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
        id
        slug
        name
      }
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
    proficiencies {
      id
      slug
      name
      briefDescription
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
    projectRoles {
      id
      employee {
        slug
        name
        intro
        id
        title
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
      role {
        id
        slug
        name
      }
    }
  }
}`
