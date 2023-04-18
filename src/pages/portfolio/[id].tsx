import { Box, Button, CardMedia, Chip, Typography } from '@mui/material';
import { useState } from 'react';

import Share from '@/components/showcase/Share';
import Layout from '@/components/template/Layout';
import Date from '@/components/utility/Date';
import { getAllPortfolioIds, getPortfolioData } from '@/lib/portfolio';
import {
  Database,
  databases,
  Framework,
  frameworks,
  Language,
  languages,
  Platform,
  platforms,
  primaryTags,
  secondaryTags,
  Tag,
} from '@/types/variables';

export interface PortfolioData {
  title: string;
  date: string;
  id: string;
  contentHtml: string;
  description: string;
  image: string;
  primaryTags: Array<string>;
  secondaryTags: Array<string>;
  githubLink?: string;
  npmLink?: string;
  liveLink?: string;
  languages: Array<string>;
  frameworks: Array<string>;
  databases: Array<string>;
  platforms: Array<string>;
}

export default function Portfolio({ portfolioData }: { portfolioData: PortfolioData }) {
  const [openShare, setOpenShare] = useState(false);

  const projectPrimaryTags = portfolioData.primaryTags?.map((tag) => {
    const isValid = Object.keys(primaryTags).includes(tag);
    if (!isValid) {
      return new Tag({
        name: tag,
        abbreviation: tag,
      });
    }
    return primaryTags[tag as keyof typeof primaryTags];
  });

  const projectSecondaryTags = portfolioData.secondaryTags?.map((tag) => {
    const isValid = Object.keys(secondaryTags).includes(tag);
    if (!isValid) {
      return new Tag({
        name: tag,
        abbreviation: tag,
      });
    }
    return secondaryTags[tag as keyof typeof secondaryTags];
  });

  const projectLanguages = portfolioData.languages?.map((language) => {
    const isValid = Object.keys(languages).includes(language);
    if (!isValid) {
      return new Language({
        name: language,
        abbreviation: language,
      });
    }
    return languages[language as keyof typeof languages];
  });

  const projectFrameworks = portfolioData.frameworks?.map((framework) => {
    const isValid = Object.keys(frameworks).includes(framework);
    if (!isValid) {
      return new Framework({
        name: framework,
        abbreviation: framework,
      });
    }
    return frameworks[framework as keyof typeof frameworks];
  });

  const projectDatabases = portfolioData.databases?.map((database) => {
    const isValid = Object.keys(databases).includes(database);
    if (!isValid) {
      return new Database({
        name: database,
        abbreviation: database,
      });
    }
    return databases[database as keyof typeof databases];
  });

  const projectPlatforms = portfolioData.platforms?.map((platform) => {
    const isValid = Object.keys(platforms).includes(platform);
    if (!isValid) {
      return new Platform({
        name: platform,
        abbreviation: platform,
      });
    }
    return platforms[platform as keyof typeof platforms];
  });
  return (
    <Layout>
      <Typography variant="h3">{portfolioData.title}</Typography>
      <Typography variant="caption">
        <Date dateString={portfolioData.date} />
      </Typography>

      <CardMedia
        component="img"
        height="200px"
        image={`/images/portfolio/${portfolioData.image}`}
        alt={`${portfolioData.title}`}
      />
      <Box>
        {projectPrimaryTags?.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            sx={{
              backgroundColor: tag.color,
            }}
            size="small"
          />
        ))}
      </Box>
      <Box>
        {projectSecondaryTags?.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            sx={{
              backgroundColor: tag.color,
            }}
            size="small"
          />
        ))}
      </Box>

      <Box>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          style={{
            margin: '4px',
          }}
          onClick={() => setOpenShare(!openShare)}
        >
          Share
        </Button>

        {portfolioData.githubLink && (
          <Button
            size="medium"
            color="primary"
            variant="contained"
            style={{
              margin: '4px',
            }}
            href={portfolioData.githubLink}
          >
            GitHub
          </Button>
        )}
        {portfolioData.npmLink && (
          <Button
            size="medium"
            color="primary"
            variant="contained"
            style={{
              margin: '4px',
            }}
            href={portfolioData.npmLink}
          >
            NPM
          </Button>
        )}
        {portfolioData.liveLink && (
          <Button
            size="medium"
            color="primary"
            variant="contained"
            style={{
              margin: '4px',
            }}
            href={portfolioData.liveLink}
          >
            Website
          </Button>
        )}
      </Box>
      <Box>
        <Share item={portfolioData} show={openShare} />
      </Box>

      <div dangerouslySetInnerHTML={{ __html: portfolioData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPortfolioIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const portfolioData = await getPortfolioData(params.id);
  return {
    props: {
      portfolioData,
    },
  };
}
