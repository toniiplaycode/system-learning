import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  TextField,
  Button,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";

interface CourseRatingProps {
  courseId: number | string;
}

interface ReviewItem {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: string;
}

const CourseRating: React.FC<CourseRatingProps> = ({ courseId }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");

  // Mock data - sẽ được thay thế bằng API call trong tương lai
  const mockReviews: ReviewItem[] = [
    {
      id: 1,
      userName: "Nguyễn Văn A",
      userAvatar: "/src/assets/avatar.png",
      rating: 5,
      content:
        "Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích rõ ràng và có nhiều ví dụ thực tế.",
      date: "2023-08-15",
    },
    {
      id: 2,
      userName: "Trần Thị B",
      userAvatar: "/src/assets/avatar.png",
      rating: 4,
      content:
        "Nội dung hay, nhưng một số phần hơi khó hiểu. Hy vọng sẽ có thêm ví dụ trong các phần nâng cao.",
      date: "2023-08-10",
    },
    {
      id: 3,
      userName: "Lê Văn C",
      userAvatar: "/src/assets/avatar.png",
      rating: 5,
      content:
        "Tuyệt vời! Đã học được rất nhiều điều mới và áp dụng ngay vào dự án của mình.",
      date: "2023-07-22",
    },
  ];

  const handleSubmitReview = () => {
    // Xử lý gửi đánh giá
    console.log("Submitting review:", { rating, reviewText });
    // Reset form
    setRating(0);
    setReviewText("");
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Đánh giá khóa học
      </Typography>

      {/* Form đánh giá */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>Đánh giá của bạn:</Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
              />
              <Typography color="text.secondary">({rating} / 5)</Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Nhập đánh giá của bạn về khóa học..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!rating || !reviewText.trim()}
              >
                Gửi đánh giá
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Danh sách đánh giá */}
      <Typography variant="h6" gutterBottom>
        Đánh giá từ học viên
      </Typography>

      <Stack spacing={2}>
        {mockReviews.map((review) => (
          <Card key={review.id} variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar src={review.userAvatar} />
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1">
                      {review.userName}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{ ml: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: "auto" }}
                    >
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{review.content}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CourseRating;
