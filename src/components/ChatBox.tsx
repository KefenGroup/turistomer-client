import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  promptHistory: string[];
};

const ChatBox: FC<Props> = ({ promptHistory }) => {
  return (
    <Box
      width={"55%"}
      height={300}
      my={4}
      gap={4}
      p={2}
      sx={{
        overflowY: "scroll",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderColor: "#b4cbd8",
        borderRadius: 2,
        display: "flex",
        // justifyContent: "flex-end",
        flexDirection: "column",
      }}
    >
      {promptHistory.map((val, index) => (
        <div
          id={`prompt_${index}`}
          style={{
            marginTop: index === 0 ? "auto" : 0,
            padding: "0.8rem",
          }}
          key={index}
        >
          <Card
            sx={{
              height: "fit-content",
              padding: 1,
              float: index % 2 == 0 ? "right" : "left",
              maxWidth: "65%",
              display: "flex",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <CardHeader
              sx={{ padding: 0 }}
              avatar={
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "black",
                  }}
                  aria-label="recipe"
                >
                  Y
                </Avatar>
              }
            />
            <Typography
              sx={{
                textAlign: index % 2 == 0 ? "right" : "left",
              }}
            >
              {val}
            </Typography>
          </Card>
        </div>
      ))}
    </Box>
  );
};

export default ChatBox;
