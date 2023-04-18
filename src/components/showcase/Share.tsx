import { Collapse, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
} from 'react-share';

import { PortfolioData } from '@/pages/portfolio/[id]';

import CopyToClipboardLink from './CopyToClipboardLink';

export default function Share({ item, show }: { item: Partial<PortfolioData>; show: boolean }) {
  const [shareUrl, setShareUrl] = useState<string>('');
  const title = item.title;

  useEffect(() => {
    //get canonical url from head meta
    const url = document.querySelector("meta[name='canonical']")?.getAttribute('content') || '';
    setShareUrl(`${url}${item.id}` || '');
  }, [item.id]);

  return (
    <Collapse in={show}>
      <Grid item xs={12}>
        <Grid item xs={12} marginBottom={2}>
          {/* Link to copy to clipboard */}
          <CopyToClipboardLink link={shareUrl} selected={show} />
        </Grid>
        <Grid sx={{ flexGrow: 1 }} container justifyContent={'space-between'}>
          <div className="network">
            <FacebookShareButton url={shareUrl} quote={title} className="share-button">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <div className="network">
            <FacebookMessengerShareButton
              url={shareUrl}
              appId="521270401588372"
              className="share-button"
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </div>

          <div className="network">
            <TwitterShareButton url={shareUrl} title={title} className="share-button">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div className="network">
            <TelegramShareButton url={shareUrl} title={title} className="share-button">
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div className="network">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div className="network">
            <LinkedinShareButton url={shareUrl} className="share-button">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className="network">
            <PinterestShareButton
              url={shareUrl}
              media={`${shareUrl}/exampleImage`}
              className="share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>

          <div className="network">
            <RedditShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className="share-button"
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>

          <div className="network">
            <TumblrShareButton url={shareUrl} title={title} className="share-button">
              <TumblrIcon size={32} round />
            </TumblrShareButton>
          </div>

          <div className="network">
            <EmailShareButton url={shareUrl} subject={title} body="body" className="share-button">
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>

          <div className="network">
            <LineShareButton url={shareUrl} title={title} className="share-button">
              <LineIcon size={32} round />
            </LineShareButton>
          </div>

          <div className="network">
            <PocketShareButton url={shareUrl} title={title} className="share-button">
              <PocketIcon size={32} round />
            </PocketShareButton>
          </div>
        </Grid>
      </Grid>
    </Collapse>
  );
}
