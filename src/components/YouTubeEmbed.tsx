import Box from '@mui/material/Box';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        pt: '56.25%',
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: '#000',
      }}
    >
      <Box
        component="iframe"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    </Box>
  );
}
