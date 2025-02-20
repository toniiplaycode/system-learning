import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { AccessTime, PlayCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface CardCourseProps {
  id: number;
  title: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  rating: number;
  totalRatings: number;
  duration: string;
  totalLessons: number;
  price: number;
  image: string;
}

const CardCourse: React.FC<CardCourseProps> = ({
  id,
  title,
  instructor,
  rating,
  totalRatings,
  duration,
  totalLessons,
  price,
  image,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(`/course/${id}`)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3.6em",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar
            src={instructor.avatar}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {instructor.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="body2"
            color="warning.main"
            fontWeight="bold"
            sx={{ mr: 1 }}
          >
            {rating}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "flex",
              color: "warning.main",
              fontSize: "1rem",
            }}
          >
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({totalRatings})
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 1, color: "text.secondary" }}
        >
          <AccessTime sx={{ fontSize: "1rem" }} />
          <Typography variant="body2">{duration}</Typography>
          <PlayCircle sx={{ fontSize: "1rem", ml: 1 }} />
          <Typography variant="body2">{totalLessons} bài học</Typography>
        </Stack>

        <Typography
          variant="h6"
          color="primary"
          sx={{ mt: "auto", fontWeight: "bold" }}
        >
          {formatPrice(price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardCourse;
