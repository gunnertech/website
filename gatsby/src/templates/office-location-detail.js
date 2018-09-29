import React from "react";
import * as PropTypes from "prop-types";
import { Link, graphql } from "gatsby"

import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from "react-google-maps"


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PhotoModal from '../Containers/PhotoModal';
import FullScreenHeader from '../components/FullScreenHeader';

import Section from '../components/Section';
import ScreenSubHeader from '../components/ScreenSubHeader';
import MediaObject from '../components/MediaObject';

import Layout from "../components/layout"
import withRoot from '../withRoot';

class MyMapComponent extends React.Component {
  state = {
    latLng: null,
    isOpen: true
  }

  componentDidMount = () => 
    (typeof window === 'undefined' ? {geocode: () => null} : new window.google.maps.Geocoder())
      .geocode( { 'address': this.props.address}, (results, status) =>
        status === 'OK' ? (
          this.setState({latLng: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          }})
        ) : (
          console.log('Geocode was not successful for the following reason: ' + status)
        )
    );

  render = () => !this.state.latLng ? null : (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={this.state.latLng || { lat: -34.397, lng: 150.644 }}
    >
      { this.props.isMarkerShown && 
        this.state.latLng &&
        <Marker
          position={this.state.latLng}
          labelAnchor={typeof window === 'undefined' ? null : new window.google.maps.Point(0, 0)}
          onClick={() => this.setState({isOpen: true})}
        >
          {
            this.state.isOpen &&
            <InfoWindow
              position={this.state.latLng}
              labelAnchor={typeof window === 'undefined' ? null : new window.google.maps.Point(0, 0)}
              onCloseClick={() => this.setState({isOpen: false})}
            >
              {this.props.formattedAddress}
            </InfoWindow>
          }
        </Marker>
      }
    </GoogleMap>
  )
}
  

const MyMapWithGoogle = withScriptjs(withGoogleMap(MyMapComponent))

const propTypes = {
  data: PropTypes.object.isRequired
};

class OfficeLocationDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoModalOpen: false,
      photoModalOpen: false,
      videoUrl: null,
      photoUrls: []
    };
  }

  handleVideoModalClose = () =>
    this.setState({videoModalOpen: false});

  handleVideoModalOpen = url =>
    this.setState({videoModalOpen: true, videoUrl: url});

  handlePhotoModalClose = () =>
    this.setState({photoModalOpen: false});

  handlePhotoModalOpen = urls =>
    this.setState({photoModalOpen: true, photoUrls: urls});

  render() {
    const { officeLocation } = this.props.data;
    return !officeLocation ? null : (
      <Layout>
        <PhotoModal urls={this.state.photoUrls} open={this.state.photoModalOpen} onClose={this.handlePhotoModalClose.bind(this)} />
        <FullScreenHeader 
          image={`https://media.graphcms.com/${officeLocation.thumbnail.file.handle}`}
          header={ officeLocation.name }
          subheader={ 
            <address>
              {officeLocation.address} {(officeLocation.address2||"").replace(/^d$/,"")} 
              {officeLocation.city}, {officeLocation.state}
              {officeLocation.zip}
            </address>
          }
        />

        <Section>
          <MyMapWithGoogle
            isMarkerShown
            formattedAddress={
              <div>
                {(officeLocation.photos.slice(0,1)).map(photo => 
                  <MediaObject 
                    key={photo.id}
                    image={`https://media.graphcms.com/${photo.file.handle}`}
                    description={
                      <address>
                        {officeLocation.address} {(officeLocation.address2||"").replace(/^d$/,"")} <br />
                        {officeLocation.city}, {officeLocation.state} <br />
                        {officeLocation.zip}
                      </address>
                    }
                    onClick={this.handlePhotoModalOpen.bind(this, officeLocation.photos.map(photo => `https://media.graphcms.com/${photo.file.handle}`))}
                    slug="View Photos"
                  />
                )}
              </div>
            }
            address={
              `${officeLocation.address} ${(officeLocation.address2||"").replace(/^d$/,"")} ${officeLocation.city}, ${officeLocation.state} ${officeLocation.zip}`
            }
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=geometry,drawing,places&amp;key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Section>
        
        <div style={{display: 'none'}}>
        <Section>
          <ScreenSubHeader title="Photos" />
          <Grid container spacing={24}>
            {officeLocation.photos.map(photo => 
              <Grid key={photo.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={photo.title}
                  image={`https://media.graphcms.com/${photo.file.handle}`}
                  description={photo.description}
                  onClick={this.handlePhotoModalOpen.bind(this, officeLocation.photos.map(photo => `https://media.graphcms.com/${photo.file.handle}`))}
                  slug="View Full Size"
                />
              </Grid>
            )}
          </Grid>
        </Section>
        </div>

        <Section>
          <ScreenSubHeader title="At This Location" />
          <Grid container spacing={24}>
            {officeLocation.employees.map(employee => 
              <Grid key={employee.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MediaObject 
                  title={<Link to={`/employees/${employee.slug}`}>{employee.name}</Link>}
                  image={!employee.coverPhoto ? (
                    require('../assets/images/gunner-banner.jpg')
                    ) : (
                      `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${employee.coverPhoto.file.handle}`
                    )
                  }
                  logo={!employee.thumbnail ? null : `https://media.graphcms.com/resize=w:512,h:512,a:top,fit:crop/${
                    employee.thumbnail.file.handle
                  }`}
                  logoFallback={
                    employee.name.split(" ").map(word => word.substring(0,1).toUpperCase()).slice(0,2).join("")
                  }
                  description={
                    <div>
                      <Typography variant="body2">{employee.title}</Typography>
                      <Typography paragraph>{employee.intro}</Typography>
                    </div>
                  }
                  url={`/employees/${employee.slug}`}
                  slug="Learn More"
                />
              </Grid>
            )} 
          </Grid>
        </Section>
      </Layout>
    );
  }
}

OfficeLocationDetailTemplate.propTypes = propTypes;

export default withRoot(OfficeLocationDetailTemplate);

export const OfficeLocationDetailPageQuery = graphql`
  query getOfficeLocationById($id: String!) {
    officeLocation(id: { eq: $id }) {
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
  }
`;


//TODO: Set API Key to be only gunnertech.com domain in console