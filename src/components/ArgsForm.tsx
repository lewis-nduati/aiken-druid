import React, { ChangeEvent, useState } from "react";
import { DruidScript } from "../types/script";
import { DropdownOption, DruidArg } from "../utils/args";
import { ArgField } from "./ArgField";
import { saveArgFile } from "../utils/export";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ArgsFormProps {
  druidScript: DruidScript;
}

export const ArgsForm = ({ druidScript }: ArgsFormProps) => {
  const [datumState, setDatumState] = useState<DruidArg | undefined>(druidScript.args.datum);
  const [datumFilename, setDatumFilename] = useState<string>(datumState ? datumState.label : "");

  const [redeemerState, setRedeemerState] = useState<DruidArg>(druidScript.args.redeemer);
  const [redeemerFilename, setRedeemerFilename] = useState<string>(redeemerState.label);

  const handleDatum = (uuid: string, newValue: string) => {
    const datumClone = datumState?.clone();
    const childArg = datumClone?.getChildById(uuid);
    if (childArg instanceof DropdownOption) return;
    childArg?.setFieldVal(newValue);
    setDatumState(datumClone);
  };

  const handleDatumFilename = (e: ChangeEvent<HTMLInputElement>) => {
    setDatumFilename(e.target.value);
  };

  const handleDatumSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (datumState) {
      saveArgFile(datumFilename, datumState);
    }
  };

  const handleRedeemer = (uuid: string, newValue: string) => {
    const redeemerClone = redeemerState.clone();
    const childArg = redeemerClone.getChildById(uuid);
    if (childArg instanceof DropdownOption) return;
    childArg?.setFieldVal(newValue);
    setRedeemerState(redeemerClone);
  };

  const handleRedeemerFilename = (e: ChangeEvent<HTMLInputElement>) => {
    setRedeemerFilename(e.target.value);
  };

  const handleRedeemerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveArgFile(redeemerFilename, redeemerState);
  };

  return (
    <>
      {datumState && (
        <Box
          component="form"
          onSubmit={handleDatumSubmit}
          mb={4}
          p={3}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
          id={`${druidScript.uuid}_datum`}
        >
          <Typography variant="h6" gutterBottom>
            Datum
          </Typography>
          <ArgField
            arg={datumState}
            onChange={(e) => handleDatum(e.target.id, e.target.value)}
          />
          <Box mt={2}>
            <TextField
              fullWidth
              label="Filename"
              id="datum-filename"
              value={datumFilename}
              onChange={handleDatumFilename}
              variant="outlined"
            />
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Craft Datum
            </Button>
          </Box>
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleRedeemerSubmit}
        mb={4}
        p={3}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        id={`${druidScript.uuid}_redeemer`}
      >
        <Typography variant="h6" gutterBottom>
          Redeemer
        </Typography>
        <ArgField
          arg={redeemerState}
          onChange={(e) => handleRedeemer(e.target.id, e.target.value)}
        />
        <Box mt={2}>
          <TextField
            fullWidth
            label="Filename"
            id="redeemer-filename"
            value={redeemerFilename}
            onChange={handleRedeemerFilename}
            variant="outlined"
          />
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="secondary">
            Craft Redeemer
          </Button>
        </Box>
      </Box>
    </>
  );
};
