import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Description,
  PictureAsPdf,
  Image,
  Code,
  Archive,
  AttachFile,
  Download,
  Close,
  FileOpen,
} from "@mui/icons-material";

interface Document {
  id: number;
  title: string;
  description?: string;
  fileType: string; // "pdf", "image", "code", "archive", "other"
  fileSize: string;
  downloadUrl: string;
}

interface ContentDocumentsProps {
  documents: Document[];
}

const ContentDocuments: React.FC<ContentDocumentsProps> = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <PictureAsPdf color="error" />;
      case "image":
        return <Image color="primary" />;
      case "code":
        return <Code color="secondary" />;
      case "archive":
        return <Archive color="warning" />;
      default:
        return <AttachFile />;
    }
  };

  const handlePreview = (doc: Document) => {
    setSelectedDocument(doc);
    setPreviewOpen(true);
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const renderPreview = (doc: Document) => {
    switch (doc.fileType) {
      case "pdf":
        return (
          <iframe
            src={doc.downloadUrl}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            title={doc.title}
          />
        );
      case "image":
        return (
          <img
            src={doc.downloadUrl}
            alt={doc.title}
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        );
      default:
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" gutterBottom>
              Không thể xem trước tệp này.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => handleDownload(doc.downloadUrl)}
              sx={{ mt: 2 }}
            >
              Tải xuống để xem
            </Button>
          </Box>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tài liệu học tập
      </Typography>

      <List sx={{ bgcolor: "background.paper" }}>
        {documents.map((doc) => (
          <ListItem
            key={doc.id}
            disablePadding
            secondaryAction={
              <Button
                size="small"
                startIcon={<Download />}
                onClick={() => handleDownload(doc.downloadUrl)}
              >
                Tải xuống
              </Button>
            }
          >
            <ListItemButton onClick={() => handlePreview(doc)}>
              <ListItemIcon>{getFileIcon(doc.fileType)}</ListItemIcon>
              <ListItemText
                primary={doc.title}
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {doc.fileSize}
                    </Typography>
                    <Chip
                      label={doc.fileType.toUpperCase()}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedDocument && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{selectedDocument.title}</Typography>
                <IconButton onClick={() => setPreviewOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>{renderPreview(selectedDocument)}</DialogContent>
            <DialogActions>
              <Button
                startIcon={<FileOpen />}
                onClick={() =>
                  window.open(selectedDocument.downloadUrl, "_blank")
                }
              >
                Mở trong tab mới
              </Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={() => handleDownload(selectedDocument.downloadUrl)}
              >
                Tải xuống
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ContentDocuments;
