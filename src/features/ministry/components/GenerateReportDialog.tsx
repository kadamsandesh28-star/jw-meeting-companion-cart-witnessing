import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  FieldServiceReportData,
  MinistryParticipation,
} from "../types/report";

interface GenerateReportDialogProps {
  open: boolean;
  month: string;
  year: number;
  hours: number;
  bibleStudies: number;
  onClose: () => void;
  onGenerate: (report: FieldServiceReportData) => void;
}

export default function GenerateReportDialog({
  open,
  month,
  year,
  hours,
  bibleStudies,
  onClose,
  onGenerate,
}: GenerateReportDialogProps) {
  const [publisherName, setPublisherName] = useState("");

  const [participation, setParticipation] =
    useState<MinistryParticipation>("Publisher");

  const [reportHours, setReportHours] =
    useState(hours.toString());

  const [reportBibleStudies, setReportBibleStudies] =
    useState(bibleStudies.toString());

  const [comments, setComments] = useState("");

  useEffect(() => {
    if (open) {
      setReportHours(hours.toString());
      setReportBibleStudies(
        bibleStudies.toString()
      );
      setParticipation("Publisher");
      setComments("");
    }
  }, [open, hours, bibleStudies]);

  const handleGenerate = () => {
    onGenerate({
      publisherName: publisherName.trim(),
      month,
      year,
      participation,
      hours: Number(reportHours) || 0,
      bibleStudies:
        Number(reportBibleStudies) || 0,
      comments,
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Generate Monthly Field Service Report
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Publisher Name"
            value={publisherName}
            onChange={(e) =>
              setPublisherName(e.target.value)
            }
            fullWidth
            required
          />

          <TextField
            label="Month"
            value={`${month} ${year}`}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />

          <FormControl>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1 }}
            >
              Participation
            </Typography>

            <RadioGroup
              value={participation}
              onChange={(e) =>
                setParticipation(
                  e.target
                    .value as MinistryParticipation
                )
              }
            >
              <FormControlLabel
                value="Publisher"
                control={<Radio />}
                label="Publisher"
              />

              <FormControlLabel
                value="Auxiliary Pioneer"
                control={<Radio />}
                label="Auxiliary Pioneer"
              />

              <FormControlLabel
                value="Regular Pioneer"
                control={<Radio />}
                label="Regular Pioneer"
              />

              <FormControlLabel
                value="Special Pioneer"
                control={<Radio />}
                label="Special Pioneer"
              />

              <FormControlLabel
                value="Field Missionary"
                control={<Radio />}
                label="Field Missionary"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Hours"
            type="number"
            value={reportHours}
            onChange={(e) =>
              setReportHours(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Bible Studies"
            type="number"
            value={reportBibleStudies}
            onChange={(e) =>
              setReportBibleStudies(
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="Comments"
            value={comments}
            onChange={(e) =>
              setComments(e.target.value)
            }
            multiline
            rows={5}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={!publisherName.trim()}
        >
          Generate PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}