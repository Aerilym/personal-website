import { Container, Link, Typography } from '@mui/material';

import Layout from '@/components/template/Layout';

export default function Contact() {
  return (
    <Layout>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Link href="mailto:contact@aerilym.com">
          <Typography variant="h4">Send me an email</Typography>
        </Link>
      </Container>
    </Layout>
  );
}
