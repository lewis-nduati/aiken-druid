import React, { useCallback, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

interface ModuleSelectorProps {
  modules: string[];
  onSelect: (selectedOption: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ modules, onSelect }) => {
  const [selected, setSelected] = useState('');

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value;
      setSelected(value);
      onSelect(value);
    },
    [onSelect]
  );

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="module-select-label">Select Module</InputLabel>
      <Select
        labelId="module-select-label"
        id="module-select"
        value={selected}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
        </MenuItem>
        {modules.map((module) => (
          <MenuItem key={module} value={module}>
            {module}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModuleSelector;
