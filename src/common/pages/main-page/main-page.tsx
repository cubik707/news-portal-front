import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import NewsPost from '../../../features/news/ui';
import { TagsBlock } from '../../../features/tags/ui/tags-block.tsx';
import { CommentsBlock } from '../../../features/comments/ui/comments-block.tsx';
import { Container, Skeleton } from '@mui/material';
import { Header } from '../../components/header/header.tsx';
import { useGetNewsByCategoryAndStatusQuery, useGetNewsByStatusQuery } from '../../../features/news/api/news-api.ts';
import { NewsStatus } from '../../../features/news/types/news-status.enum.ts';
import { useGetLast3TagsQuery } from '../../../features/tags/api/tagsApi.ts';
import { useGetAllCategoriesQuery } from '../../../features/category/api/categoryApi.ts';
import { NewsSkeleton } from '../../../features/news/ui/skeleton.tsx';
import { useMemo, useState } from 'react';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const {
    data: newsByStatusData,
    isLoading: isNewsByStatusLoading,
  } = useGetNewsByStatusQuery(NewsStatus.published, {
    skip: selectedCategoryId !== null,
  });

  const {
    data: newsByCategoryData,
    isLoading: isNewsByCategoryLoading,
  } = useGetNewsByCategoryAndStatusQuery(
    {
      categoryId: selectedCategoryId!,
      status: NewsStatus.published,
    },
    {
      skip: selectedCategoryId === null,
    }
  );

  const newsList = useMemo(() => {
    return selectedCategoryId === null
      ? newsByStatusData?.data || []
      : newsByCategoryData?.data || [];
  }, [newsByStatusData, newsByCategoryData, selectedCategoryId]);

  const isNewsLoading = selectedCategoryId === null ? isNewsByStatusLoading : isNewsByCategoryLoading;

  const { data: tagsData, isLoading: isTagsLoading } = useGetLast3TagsQuery();
  const lastTags = tagsData?.data || [];

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const categoriesList = categoriesData?.data || [];

  const onChangeActiveCategory = (newValue: number) => {
    setActiveTab(newValue);
    const selectedCategory = newValue === 0 ? null : categoriesList[newValue - 1];
    setSelectedCategoryId(selectedCategory?.id ?? null);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Tabs
          value={activeTab}
          onChange={(_, newValue: number) => onChangeActiveCategory(newValue)}
          style={{ marginBottom: 15 }}
          aria-label="basic tabs example">
          <Tab label="All"/>
          {isCategoriesLoading ? (
            Array(3).fill(null).map((_, index) => (
              <Tab
                key={index}
                disabled
                label={
                  <Skeleton
                    variant="text"
                    width={80}
                    height={40}
                    animation="wave"
                    sx={{ mx: 1 }}
                  />
                }
              />
            ))
          ) : (
            categoriesList.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
              />
            ))
          )}
        </Tabs>
        <Grid container spacing={4}>
          <Grid size={{ xs: 8 }}>
            {(isNewsLoading ? Array(5).fill(null) : newsList).map((news, index) =>
              isNewsLoading ? (
                <NewsSkeleton key={index} />
              ) : (
                <NewsPost
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  image={`${import.meta.env.VITE_API_BASE_URL}${news.image}`}
                  author={news.author}
                  publishedAt={news.publishedAt}
                  likesCount={150}
                  commentsCount={3}
                  tags={news.tags}
                  isEditable
                />
              ),
            )}
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TagsBlock items={lastTags} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;