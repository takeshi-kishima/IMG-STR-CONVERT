import React from "react";
import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import format from "date-fns/format";

function App() {
  const [imgData, setImgData] = useState("");
  const [imgFileName, setImgFileName] = useState("");
  const [lastModifiedDate, setLastModifiedDate] = useState("");
  const [imgFileDataInput, setImgFileDataInput] = useState("");

  const clear = () => {
    setImgData("");
    setImgFileName("");
    setLastModifiedDate("");
    setImgFileDataInput("");
  };

  const imageConv = async (kore: File) => {
    if (kore) {
      const dekita = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (file) => {
          if (file.target) {
            resolve(file.target.result);
          } else {
            reject();
          }
        };
        reader.onerror = (e) => {
          console.error(e);
          reject();
        };
        reader.readAsDataURL(kore);
      });
      setImgData(dekita as string);
      setImgFileDataInput(dekita as string);
      setImgFileName(kore.name);
      setLastModifiedDate(
        format(new Date(kore.lastModified), "yyyy/MM/dd HH:mm:ss")
      );
    }
  };

  const kaeruButton = () => {
    console.log(imgFileDataInput);
    setImgData(imgFileDataInput);
    setImgFileName("文字から生成");
    setLastModifiedDate(format(new Date(), "yyyy/MM/dd HH:mm:ss"));
  };

  return (
    <div className="App">
      <header></header>
      <Box sx={{ padding: 5, flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={5.5}>
            <Card>
              {imgData !== "" && (
                <CardMedia
                  style={{ maxHeight: "50vh" }}
                  component={"img"}
                  image={imgData}
                  title={imgFileName}
                  sx={{ objectFit: "contain" }}
                  onError={(e) => console.log(e)}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {imgFileName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {lastModifiedDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 xs={1}>
            <Grid2>
              <Button variant="contained" onClick={clear}>
                {"-"}
              </Button>
            </Grid2>
            <Grid2>
              <Button variant="contained">
                {"→"}
                <input
                  type="file"
                  className="inputFileBtnHide"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      imageConv(e.target.files[0]);
                    }
                    e.target.value = "";
                  }}
                />
              </Button>
            </Grid2>
            <Grid2>
              <Button variant="contained" onClick={kaeruButton}>
                {"←"}
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 xs={5.5}>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="base64"
              value={imgFileDataInput}
              maxRows={35}
              style={{ width: "100%" }}
              onChange={(input) => setImgFileDataInput(input.target.value)}
            />
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}

export default App;
