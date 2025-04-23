import { ChangeEvent, FormEvent, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import { DropdownOption, DruidArg } from "../utils/args";
import { DruidScript } from "../types/script";
import { ArgField } from "./ArgField";
import { applyParamsToScript } from "@meshsdk/core-csl";
import { plutusValToMeshData, saveScriptFile } from "../utils/export";
import { PlutusScriptVersion } from "../types/export";

interface ScriptExportProps {
  druidScript: DruidScript;
}

export const ScriptExport = ({ druidScript }: ScriptExportProps) => {
  const [paramsState, setParamsState] = useState<DruidArg[]>(
    druidScript.args.parameters || []
  );
  const [filename, setFilename] = useState<string>(druidScript.name);
  const [description, setDescription] = useState<string>("");

  const handleParams = (index: number, uuid: string, newValue: string) => {
    const paramsClone = cloneDeep(paramsState);
    const childArg = paramsClone[index]?.getChildById(uuid);

    if (!(childArg instanceof DropdownOption)) {
      childArg?.setFieldVal(newValue);
      setParamsState(paramsClone);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const compiledCode = druidScript.compiledCode;

    const cborHex = paramsState.length
      ? applyParamsToScript(
          compiledCode,
          paramsState.map((arg) =>
            plutusValToMeshData(arg.toPlutusVal())
          )
        )
      : compiledCode;

    saveScriptFile(
      filename,
      PlutusScriptVersion.PlutusScriptV2,
      description,
      cborHex
    );
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Craft Your Smart Contract
        </Typography>

        {paramsState.length > 0 && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Parameters
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {paramsState.map((arg, index) => (
              <ArgField
                key={arg.uuid}
                arg={arg}
                onChange={(e) => handleParams(index, e.target.id, e.target.value)}
              />
            ))}
          </>
        )}

        <TextField
          label="Filename"
          fullWidth
          variant="outlined"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          sx={{ mt: 3 }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Export Script
        </Button>
      </form>
    </Paper>
  );
};
