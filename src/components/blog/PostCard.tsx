import { Avatar, Box, Button, CardActionArea, CardActions, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';

import { PostData } from '@/pages/posts/[id]';
import {
  Database,
  databases,
  Framework,
  frameworks,
  Language,
  languages,
  Platform,
  platforms,
} from '@/types/variables';

import Share from '../showcase/Share';

export default function PostCard({
  item,
  summary,
}: {
  item: Partial<PostData>;
  summary?: boolean;
}) {
  const [openShare, setOpenShare] = useState(false);

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
    <Card
      style={{
        flexDirection: 'row',
      }}
    >
      <CardActionArea
        LinkComponent={Link}
        href={`/posts/${item.id}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box width={'33%'}>
          <CardMedia
            component="img"
            /* image={`images/posts/${item.image}`} */
            image={`images/portfolio/swrpgpointtracker.png`}
            alt={`${item.title}`}
          />
        </Box>
        <Box height={'100%'}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <CardActions>
              {[projectLanguages, projectFrameworks, projectDatabases, projectPlatforms].map(
                (items) =>
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
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={`/posts/${item.id}`} LinkComponent={Link}>
          Read More
        </Button>
        {!summary && (
          <Button size="small" color="primary" onClick={() => setOpenShare(!openShare)}>
            Share
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
