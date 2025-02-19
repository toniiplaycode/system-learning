import { Container, Typography, Grid, Button, Box, Stack } from "@mui/material";

import FeaturedCourses from "../components/home/FeaturedCourses";
import FeaturedInstructors from "../components/home/FeaturedInstructors";
import ForumDiscussions from "../components/home/ForumDiscussions";
import FeaturedPosts from "../components/home/FeaturedPosts";

const HomePage = () => {
  return (
    <>
      {/* Hero Section with Background */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "text.primary",
          pt: 15,
          pb: 8,
          position: "relative",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                Nền tảng hỗ trợ học tập
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}
                  DNC LEARNING
                </Box>
              </Typography>
              <Typography variant="h5" paragraph>
                Khám phá hơn 1000+ khóa học từ các giảng viên chuyên nghiệp
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "primary.dark",
                    "&:hover": { bgcolor: "primary.main" },
                  }}
                >
                  Khám phá khóa học
                </Button>
                <Button variant="outlined" size="large">
                  Đăng ký giảng dạy
                </Button>
              </Stack>

              {/* Stats */}
              <Grid container spacing={3} sx={{ mt: 4 }}>
                {[
                  { count: "15K+", label: "Học viên" },
                  { count: "1000+", label: "Khóa học" },
                  { count: "200+", label: "Giảng viên" },
                ].map((stat) => (
                  <Grid item xs={4} key={stat.label}>
                    <Typography
                      variant="h4"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {stat.count}
                    </Typography>
                    <Typography variant="body1">{stat.label}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/src/assets/banner.png"
                alt="Learning"
                sx={{ width: "100%", maxWidth: 1000, objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <FeaturedCourses />
        <FeaturedInstructors />
        <ForumDiscussions />
        <FeaturedPosts />
      </Container>
    </>
  );
};

export default HomePage;
