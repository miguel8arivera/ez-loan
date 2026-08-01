import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SearchSortBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function SearchSortBar({ searchValue, onSearchChange }: SearchSortBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        placeholder="Search loans..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'surface.main',
            borderRadius: 2,
            '& fieldset': { borderColor: 'surface.border' },
            '&:hover fieldset': { borderColor: 'surface.border' },
          },
        }}
      />
      <Button
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          borderRadius: 2,
          px: 2.5,
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        Sort by
      </Button>
    </Box>
  );
}
