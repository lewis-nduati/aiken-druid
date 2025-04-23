import React, { useState, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface ScriptSelectorProps {
  scripts: string[];
  onSelect: (selectedScript: string) => void;
}

const ScriptSelector: React.FC<ScriptSelectorProps> = ({ scripts, onSelect }) => {
  const [selected, setSelected] = useState<string>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      setSelected(value);
      onSelect(value);
    },
    [onSelect]
  );

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="script-select-label">Script</InputLabel>
      <Select
        labelId="script-select-label"
        id="script-select"
        value={selected}
        onChange={handleChange}
        label="Script"
      >
        {scripts.length > 0 ? (
          scripts.map((script) => (
            <MenuItem key={script} value={script}>
              {script}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No scripts available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default ScriptSelector;
