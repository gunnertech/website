import React, { Component } from "react";
import { graphql } from "gatsby"
import { Link } from "gatsby";

// import WebFont from 'webfontloader';

import TwitterIcon from 'react-mdi-props/icons/trophy';
import Certificate from 'react-mdi-props/icons/certificate';
import Briefcase from 'react-mdi-props/icons/briefcase';

// import {ResponsiveContainer, BarChart, PieChart, Pie, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Bar} from 'recharts';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import Counter from '../components/Counter';

import FullScreenHeader from '../components/FullScreenHeader';
import ScreenSubHeader from '../components/ScreenSubHeader';
import Body from '../components/Body';
import Section from '../components/Section';
import Layout from "../components/layout"
import ExpansionListItem from "../components/ExpansionListItem"
import withRoot from '../withRoot';


// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]


// const data2 = [
//   {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//   {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//   {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//   {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//   {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//   {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];

// const data3 = [
// {name: 'Project A', uv: 4000, pv: 2400, amt: 2400},
// {name: 'Project B', uv: 3000, pv: 1398, amt: 2210},
// {name: 'Project C', uv: 2000, pv: 9800, amt: 2290},
// {name: 'Project D', uv: 2780, pv: 3908, amt: 2000},
// {name: 'Project E', uv: 1890, pv: 4800, amt: 2181},
// {name: 'Project F', uv: 2390, pv: 3800, amt: 2500},
// {name: 'Project G', uv: 3490, pv: 4300, amt: 2100}];



// WebFont.load({
//   google: {
//     families: ['Montserrat:400,700', 'Raleway:400,300,300italic,400italic,500,500italic,600,600italic,700,700italic', 'Roboto:300,400,500']
//   }
// });
class IndexPage extends Component {
  render() {
    return (
      <Layout>
        <FullScreenHeader 
          header="Gunner Technology"
          subheader="Specific Solutions for Specific Problems"
          image={require('../assets/images/gunner-home-banner.jpg')}
          logo={require('../assets/images/gunner-logo.jpg')}
        />
        <Section>
          <ScreenSubHeader title="About Gunner Technology" />
          <Typography paragraph>Gunner Technology is a minority owned, disadvantaged small business headquartered in Las Vegas, NV with employees spread out throughout the country.</Typography>
          <Typography paragraph>We have offices in South Florida, California, Nevada and New York and remote employees in at least five other states.</Typography>
          <Typography paragraph>We are a cross-functional team of fewer than 20 people - all based in the US and all of which fill either technical or management roles.</Typography>
          <Typography paragraph>We have worked with entrepreneurs and small-to-midsize companies since our founding in 2010 where we have helped over 50 clients launch their ideas and grown their business.</Typography>
          <Typography paragraph>Our focus is on long-term relationships and through the building of custom software solutions  and staff augmentation , we are approaching $5 million in annual revenue while maintaining a net promoter score  of 9.5 among current and former clients.</Typography>
          <Typography paragraph>Upon learning of the waste, overpricing and mismanagement in software among government contractors, we decided to enter that market as well in 2017 when we earned our GSA Schedule 70 contract and began working with both federal and state agencies.</Typography>
          
          <List>
            <ExpansionListItem
              iconText={`OA`}
              iconSrc={require('../assets/images/advantage.png')}
              title={`Our Advantage`}
              body={
                <div style={{"flex":1}}>
                  <Typography paragraph>When it comes to software, we do not believe the old saying: “There’s Low-cost, Fast and Good. You can only have two.”</Typography>
                  <Typography paragraph>We have a long-standing partnership with Amazon <Link to="/proficiencies/aws">Web Services</Link> where we are AWS Certified to build cutting edge infrastructures using the serverless , microservice  paradigm.</Typography>
                  <Typography paragraph>The paradigm means we’re able to build self-healing , secure  and highly reliable , durable , scalable  and available  at a fraction of the cost that traditional architectures would cost.</Typography>
                  <Typography paragraph>And because we are Preferred Partners with AWS via the APN program, our costs are even lower.</Typography>
                  <Typography paragraph>Furthermore, we leverage a custom version of the Agile Scrum  integrated with containerized  DevOps  with continuous delivery  that has proven to complete projects with higher satisfaction, fewer bugs and more quickly than waterfall  development.</Typography>
                  <Typography paragraph>On top of that, the microservice approach has been proven to reduce the number of bugs and defects that make their way into the production  environment, thus saving even more cost.</Typography>

                  <Typography paragraph>We also leverage open source  technologies whenever possible. </Typography>
                  <Typography paragraph>With open source, there are no licensing fees, so the cost is inherently lower, but, on top of that, open source helps quality and speed increase because it opens up an entire community of developers and engineers who provide help and support free of charge.</Typography>
                  <Typography paragraph>As a bonus, when you use open source, higher good talent is a lot easier and cheaper, too.</Typography>
                  <Typography paragraph>In fact, Gunner is built from the ground up on achieving the highest quality while minimizing costs, which is why we offer all our employees the freedom to work remotely without relocating.</Typography>
                  <Typography paragraph>This saves us cost on office space as well as salary.</Typography>
                  <Typography paragraph>So when you see our proposal and decide it’s too good to be true. It’s not. You just haven’t worked with a company like Gunner Technology before.</Typography>
                </div>
              }
            />

            <ExpansionListItem
              iconText={`OP`}
              iconSrc={require('../assets/images/philosophy.png')}
              title={`Our Philosophy`}
              body={
                <div style={{"flex":1}}>
                  <Typography paragraph>We believe entrepreneurs can use technology to make the world a better place.</Typography>
                  <Typography paragraph>We believe government can use technology to reduce waste and better serve our fellow citizens.</Typography>
                  <Typography paragraph>We believe every business can use technology to cut costs, increase efficiencies and beat out the competition.</Typography>
                  <Typography paragraph>We believe it, because we've seen it and helped do it.</Typography>
                  {/*<Body>
                    <Grid container spacing={24}>
                      <Grid xs={12} md={4} item>
                        <Typography variant="title">Scary Headline</Typography>
                        <div style={{height: 300}}>
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie dataKey="value" data={data} fill="#8884d8" label/>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </Grid>
                      <Grid xs={12} md={4} item>
                        <Typography variant="title">Scary Headline</Typography>
                        <div style={{height: 300}}>
                          <ResponsiveContainer>
                            <AreaChart data={data2}
                                  margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                              <XAxis dataKey="name"/>
                              <YAxis/>
                              <CartesianGrid strokeDasharray="3 3"/>
                              <Tooltip/>
                              <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </Grid>
        
                      <Grid xs={12} md={4} item>
                        <Typography variant="title">Scary Headline</Typography>
                        <div style={{height: 300}}>
                          <ResponsiveContainer>
                            <BarChart 
                              data={data3} 
                              layout="vertical"
                              margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                              <XAxis type="number"/>
                              <YAxis  type="category" dataKey="name"/>
                              <CartesianGrid strokeDasharray="3 3"/>
                              <Tooltip/>
                              <Legend />
                              <Bar dataKey="pv" stackId="a" fill="#8884d8" layout="vertical" name="Days Needed" />
                              <Bar dataKey="uv" stackId="a" fill="#82ca9d" layout="vertical" name="Days Allotted" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Grid>
                    </Grid>
                  </Body>*/}
        
                  <Typography paragraph>We also believe that solutions aren't always obvious and finding a technology partner can be hard.</Typography>
        
                  <Typography paragraph>This is why we invite all our clients and prospects to kick the tires with us.</Typography>
        
                  <Typography paragraph>Don't think your business can benefit from custom software?</Typography>
        
                  <Typography paragraph>Don't think your idea is possible?</Typography>
        
                  <Typography paragraph>Don't think our promises are deliverable?</Typography>
        
                  <Typography paragraph>We get it and that's why we offer new clients a full month of staff augmentation to try us out.</Typography>
        
                  <Typography paragraph>Let us take a look at your operations and tell you where software can give you an edge.</Typography>
        
                  <Typography paragraph>Let us get started building your idea to show you just how possible it is.</Typography>
        
                  <Typography paragraph>One month. No risk. Let us prove it.</Typography>
                </div>
              }
            />

            <ExpansionListItem
              iconText={`OA`}
              iconSrc={require('../assets/images/approach.png')}
              title={`Our Approach`}
              body={
                <div style={{"flex":1}}>
                  <Typography paragraph>Gunner Technology uses Agile Scrum for project management and we have several Agile and Scrum certified project managers.</Typography>
                  <Typography paragraph>Over the years, we have refined the process to make it our own and continuously refine and tweak it on a per client and per project basis to best suit the needs of the situation.</Typography>
                  <Typography paragraph>However, we generally approach each project, initially, with the same methodology.</Typography>
                  <Typography variant="subheading" gutterBottom>Eliminate the Unknowns</Typography>
                  <Typography paragraph>Nearly every project starts with unclear requirements and unknowns.</Typography>
                  <Typography paragraph>More so than anything, these can derail a project, so our first priority is to get rid of both.</Typography>
                  <Typography paragraph>We do this using research sprints [Appendix B]. </Typography>
                  <Typography paragraph>Each research sprint lasts one week and they are designed to create user stories and educate the technical team on what has to be done.</Typography>
                  <Typography paragraph>If we are integrating with a third party, does that third party have an API? How responsive are they to support requests? Is there API documented?</Typography>
                  <Typography paragraph>These are all very important questions that need to get answered in order for us to determine how much effort is required for each feature.</Typography>
                  <Typography paragraph>Beyond that, if a feature is unclear (User needs to be able to log in), research sprints are used to firm up those requirements and produce several user stories to accomplish.</Typography>
                  <Typography paragraph>Sometimes, we’ll have research sprints in the middle of a project if new requirements are added or change significantly.</Typography>
                  <Typography variant="subheading" gutterBottom>Find our Velocity</Typography>
                  <Typography paragraph>In scrum, Velocity is how many effort points your entire team can knock out in a single sprint or iteration (in our case, usually one week).</Typography>
                  <Typography paragraph>Each feature or task is assigned a certain amount of estimated effort points prior to work starting on it (at Gunner, that’s 0, 1, 2, 4, 8 or 16. Bugs get 0 and anything over 16 has to be broken into smaller stories).</Typography>
                  <Typography paragraph>We keep an overall average velocity for the company based on team size.</Typography>
                  <Typography paragraph>For example, on average, a two-person team at Gunner has a velocity of 50 points.</Typography>
                  <Typography paragraph>We estimate how long a project will take based on the summation of all effort points at the beginning of the project.</Typography>
                  <Typography paragraph>For example, after creating the user stories, a project may have a total of 5,000 effort points.</Typography>
                  <Typography paragraph>Using simple math, we can estimate that will take us 100 iterations (usually weeks) to complete.</Typography>
                  <Typography paragraph>However, each project is different so the team of two with an average velocity of 50 might trend higher or lower on a given project.</Typography>
                  <Typography paragraph>We seek that average as quickly as possible.</Typography>
                  <Typography variant="subheading" gutterBottom>Augment if needed</Typography>
                  <Typography paragraph>Specifically because if we determine we are off track, we have to add resources to the technical team to get the project back on schedule.</Typography>
                  <Typography paragraph>Using the above example, if the velocity of the team is 40, we know we are going to miss that 100 week estimation, so we need to add resources.</Typography>
                  <Typography paragraph>We can also use this score and method to alert the project stakeholder if a new feature they want is going to jeopardize the timeline and/or cost of the project.</Typography>
                  <Typography variant="subheading" gutterBottom>Reject Technical Debt</Typography>
                  <Typography paragraph>As we said, bugs get 0 points. So if we are sprints are filled with bugs, our velocity is going to suffer significantly and we will have to add significant resources to get the project back on track.</Typography>
                  <Typography variant="subheading" gutterBottom>Good Old Scrum</Typography>
                  <Typography paragraph>From there, our process is pretty standard.</Typography>
                  <Typography paragraph>We generally have three environments set up. </Typography>
                  <Typography paragraph>Production for the live site</Typography>
                  <Typography paragraph>Staging for the stable test site</Typography>
                  <Typography paragraph>QA where the latest features are tested by humans.</Typography>
                  <Typography paragraph>Each step of the way includes automated testing upon each deployment, which occurs at the end of each iteration, prior to our planning meeting.</Typography>
                  <Typography paragraph>What’s on QA gets deployed to Staging. What’s on Staging gets deployed to Production.</Typography>
                </div>
              }
            />

            <ExpansionListItem
              iconText={`OR`}
              iconSrc={require('../assets/images/results.png')}
              title={`Our Results`}
              body={
                <div style={{"flex":1}}>
                  <Body>
                    <Grid container spacing={24}>
                      <Grid xs={12} md={4} item>
                        <Counter label="Clients" start={0} end={46} Icon={TwitterIcon} />
                      </Grid>
                      <Grid xs={12} md={4} item>
                        <Counter label="Certifications" start={0} end={24} Icon={Certificate} />
                      </Grid>
                      <Grid xs={12} md={4} item>
                        <Counter label="Industries" start={0} end={15} Icon={Briefcase} isLast={true} />
                      </Grid>
                    </Grid>
                  </Body>
                </div>
              }
            />

          </List>
          
        </Section>

        
      </Layout>
    );
  }
}

export default withRoot(IndexPage);

export const pageQuery = graphql`
  query getAllEntitiesAwardsPublications {
    entities: allEntity {
      edges {
        node {
          id
          slug
          name
          description
          pitch
        }
      }
    }
  }
`;