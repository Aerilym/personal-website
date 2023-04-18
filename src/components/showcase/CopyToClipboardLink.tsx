import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function CopyToClipboardLint({
  link,
  selected,
}: {
  link: string;
  selected: boolean;
}) {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    if (selected) {
      input.current?.focus();
    }
  }, [selected]);

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="lint-input">Link</InputLabel>
        <OutlinedInput
          inputRef={input}
          size="small"
          id="linkInput"
          contentEditable={false}
          value={link}
          label="Link"
          type={'text'}
          onFocus={(e) => e.target.select()}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="copy transcribed text" onClick={handleClick}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
}
