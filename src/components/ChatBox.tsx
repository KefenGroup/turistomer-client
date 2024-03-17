import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { FC } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

type Props = {
  promptHistory: string[];
};

const ChatBox: FC<Props> = ({ promptHistory }) => {
  return (
    <Box
      width={"100%"}
      height={"90%"}
      gap={4}
      p={2}
      sx={{
        overflowY: "auto",
        boxSizing: "border-box",
        display: "flex",
        // justifyContent: "flex-end",
        flexDirection: "column",
        justifyContent: promptHistory.length === 0 ? "center" : "",
        alignItems: promptHistory.length === 0 ? "center" : "",
      }}
    >
      {promptHistory.length === 0 && (
        <Typography color="gray" textAlign="center" variant="h4">
          Start Your Conversation With Turist Omer!
          <ChatBubbleOutlineIcon
            sx={{ marginBottom: 1, marginLeft: 0.5 }}
            fontSize="large"
          ></ChatBubbleOutlineIcon>
        </Typography>
      )}
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
              paddingRight: 2,
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
