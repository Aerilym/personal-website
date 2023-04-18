import { Box, Container, Fade } from '@mui/material';

import Head, { HeadProps } from './Head';
import Navbar from './Navbar';

export default function Layout({
  children,
  headProps,
}: {
  children: React.ReactNode;
  headProps?: HeadProps;
}) {
  return (
    <Box>
      <Head headProps={headProps} />
      <Navbar />
      <Fade in>
        <Container
          style={{
            paddingTop: '6rem',
            paddingBottom: '2rem',
            minHeight: '100vh',
          }}
        >
          {children}
        </Container>
      </Fade>
    </Box>
  );
}
