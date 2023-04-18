import { Avatar, Box, Button, CardActionArea, CardActions, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';

import { PortfolioData } from '@/pages/portfolio/[id]';
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

import Share from '../showcase/Share';

export default function ProjectCard({
  item,
  summary,
}: {
  item: Partial<PortfolioData>;
  summary?: boolean;
}) {
  const [openShare, setOpenShare] = useState(false);

  const projectPrimaryTags = item.primaryTags?.map((tag) => {
    const isValid = Object.keys(primaryTags).includes(tag);
    if (!isValid) {
      return new Tag({
        name: tag,
        abbreviation: tag,
      });
    }
    return primaryTags[tag as keyof typeof primaryTags];
  });

  const projectSecondaryTags = item.secondaryTags?.map((tag) => {
    const isValid = Object.keys(secondaryTags).includes(tag);
    if (!isValid) {
      return new Tag({
        name: tag,
        abbreviation: tag,
      });
    }
    return secondaryTags[tag as keyof typeof secondaryTags];
  });

  const projectLanguages = item.languages?.map((language) => {
    const isValid = Object.keys(languages).includes(language);
    if (!isValid) {
      return new Language({
        name: language,
        abbreviation: language,
      });
    }
    return languages[language as keyof typeof languages];
  });

  const projectFrameworks = item.frameworks?.map((framework) => {
    const isValid = Object.keys(frameworks).includes(framework);
    if (!isValid) {
      return new Framework({
        name: framework,
        abbreviation: framework,
      });
    }
    return frameworks[framework as keyof typeof frameworks];
  });

  const projectDatabases = item.databases?.map((database) => {
    const isValid = Object.keys(databases).includes(database);
    if (!isValid) {
      return new Database({
        name: database,
        abbreviation: database,
      });
    }
    return databases[database as keyof typeof databases];
  });

  const projectPlatforms = item.platforms?.map((platform) => {
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
    <Card>
      <CardActionArea LinkComponent={Link} href={`/portfolio/${item.id}`}>
        <Box height={'200px'}>
          <CardMedia
            component="img"
            height="200px"
            image={`images/portfolio/${item.image}`}
            alt={`${item.title}`}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '200px',
              zIndex: 1,
              backgroundColor: 'rgb(0 0 0 / 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <CardActions>
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
            </CardActions>
            <CardActions>
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
            </CardActions>
          </div>
        </Box>
        <CardActions>
          {[projectLanguages, projectFrameworks, projectDatabases, projectPlatforms].map((items) =>
            items?.map((tech) => (
              <Chip
                key={tech.abbreviation}
                label={tech.abbreviation}
                sx={{
                  backgroundColor: tech.color,
                }}
                size="small"
                avatar={<Avatar src={`/images/icons/${tech.abbreviation}.png`} />}
              />
            ))
          )}
        </CardActions>
        <CardContent
          sx={{
            paddingTop: 0,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!summary && (
          <Button size="small" color="primary" onClick={() => setOpenShare(!openShare)}>
            Share
          </Button>
        )}
        {item.githubLink && (
          <Button size="small" color="primary" href={item.githubLink}>
            GitHub
          </Button>
        )}
        {item.npmLink && (
          <Button size="small" color="primary" href={item.npmLink}>
            NPM
          </Button>
        )}
        {item.liveLink && (
          <Button size="small" color="primary" href={item.liveLink}>
            Website
          </Button>
        )}
      </CardActions>
      {!summary && (
        <CardActions>
          <Share item={item} show={openShare} />
        </CardActions>
      )}
    </Card>
  );
}
