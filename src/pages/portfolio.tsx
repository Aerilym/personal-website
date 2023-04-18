import {
  Avatar,
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import ProjectCard from '@/components/portfolio/ProjectCard';
import Showcase from '@/components/showcase/Showcase';
import Layout from '@/components/template/Layout';
import { getSortedPortfolioData } from '@/lib/portfolio';
import { PortfolioData } from '@/pages/portfolio/[id]';
import { databases, frameworks, languages, platforms } from '@/types/variables';

export async function getStaticProps() {
  const allPortfolioData = getSortedPortfolioData();
  return {
    props: {
      allPortfolioData,
    },
  };
}

export default function Portfolio({
  allPortfolioData,
}: {
  allPortfolioData: Array<PortfolioData>;
}) {
  return (
    <Layout
      headProps={{
        title: 'Portfolio',
        description: 'A showcase of my projects.',
      }}
    >
      <Showcase
        data={allPortfolioData}
        searchableKeys={['title', 'description']}
        filterableKeys={['language', 'framework', 'database', 'platform']}
        ItemComponent={ItemComponent}
        ItemContainer={ItemContainerComponent}
        CustomLayout={CustomLayout}
        CustomSearchComponent={SearchComponent}
        CustomFiltersComponent={FilterComponent}
        CustomResultCount={ResultCount}
      />
    </Layout>
  );
}

function ItemContainerComponent({ children }: { children: React.ReactNode }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}

function ItemComponent({ item }: { item: PortfolioData }) {
  return (
    <Grid key={item.title} item xs={10} lg={5}>
      <ProjectCard item={item} />
    </Grid>
  );
}

function SearchComponent({ onChange }: { onChange: (search: string) => void }) {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const [loaded, setLoaded] = useState(false);

  const debouncedResults = useMemo(() => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      setSearchValue(search);
      setSearchQuery(search);
      onChange(search);
    };
    const setSearchQuery = (searchString: string) => {
      if (searchString.length === 0) {
        delete router.query.search;
        router.push(router);
        return;
      }
      const encodedString = encodeURIComponent(searchString);
      router.query.search = encodedString;
      router.push(router);
    };
    return debounce(handleSearchChange, 300);
  }, [onChange, router]);

  useEffect(() => {
    if (!router.isReady) return setLoaded(false);

    const query = router.query.search;
    if (!query) return setLoaded(true);

    if (typeof query === 'string') {
      const decodedString = decodeURIComponent(query);
      setSearchValue(decodedString);
      onChange(decodedString);
    }
    setLoaded(true);
  }, [onChange, router.isReady, router.query]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return loaded ? (
    <TextField
      fullWidth
      id="outlined-basic"
      label="Search"
      variant="outlined"
      onChange={debouncedResults}
      margin="normal"
      defaultValue={searchValue}
    />
  ) : (
    <></>
  );
}

interface CustomChipDetails {
  key: string;
  option: string;
  color?: string;
  label?: string;
  icon?: string;
}

function MultipleSelectChip({
  label,
  options,
  selections,
  onChange,
  customChipDetails,
}: {
  label: string;
  options: string[];
  selections: string[];
  onChange: (selections: Array<string>) => void;
  customChipDetails?: Record<string, CustomChipDetails>;
}) {
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<typeof selections>) => {
    const {
      target: { value },
    } = event;

    let values = typeof value === 'string' ? value.split(',') : value;
    if (customChipDetails) {
      values = values.map((value) => {
        //find the customChipDetails with option = value
        const customChipDetail = Object.values(customChipDetails).find(
          (customChipDetail) => customChipDetail.option === value
        );

        return customChipDetail?.key ?? value;
      });
    }

    setFilterQuery(values);
    onChange(values);
  };

  const handleChipDelete = (chipToDelete: string) => {
    let newSelections = selections.filter((selection) => selection !== chipToDelete);
    if (customChipDetails) {
      newSelections = newSelections.map((value) => {
        //find the customChipDetails with option = value
        const customChipDetail = Object.values(customChipDetails).find(
          (customChipDetail) => customChipDetail.option === value
        );

        return customChipDetail?.key ?? value;
      });
    }
    setFilterQuery(newSelections);
    onChange(newSelections);
  };

  const setFilterQuery = (selections: Array<string>) => {
    if (selections.length === 0) {
      delete router.query[label.toLowerCase()];
      router.push(router);
      return;
    }

    router.query[label.toLowerCase()] = selections.map((value) => value.toLowerCase()).join(',');
    router.push(router);
  };

  useEffect(() => {
    const query = router.query[label.toLowerCase()];
    if (!query) return;
    if (typeof query === 'string') {
      const selections = query.split(',').map((value) => value.toLowerCase());
      onChange(selections);
    }

    if (Array.isArray(query)) {
      onChange(query.map((value) => value.toLowerCase()));
    }
  }, [label, onChange, router.query]);

  return (
    <FormControl fullWidth>
      <InputLabel id="chip-label">{label}</InputLabel>
      <Select
        labelId="chip-label"
        label={label}
        id="chip-select"
        multiple
        value={
          customChipDetails
            ? selections.map((selection) => {
                const customChipDetail = Object.values(customChipDetails).find(
                  (customChipDetail) => customChipDetail.key === selection
                );

                return customChipDetail?.option ?? selection;
              })
            : selections
        }
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, zIndex: 100000 }}>
            {selected.map((value: string) => {
              if (!customChipDetails) {
                return (
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      zIndex: 100000000,
                    }}
                    onDelete={() => {
                      console.log('delete');
                      handleChipDelete(customChipDetail?.key ?? value);
                    }}
                  />
                );
              }

              //find the customChipDetails with option = value
              const customChipDetail = Object.values(customChipDetails).find(
                (customChipDetail) => customChipDetail.option === value
              );
              console.log(customChipDetail);

              const { color, label, icon } = customChipDetail ?? {};

              return (
                <Chip
                  key={value}
                  label={label ?? value}
                  onDelete={() => {
                    console.log('delete');
                    handleChipDelete(customChipDetail?.key ?? value);
                  }}
                  sx={{
                    backgroundColor: color,
                    zIndex: 100000000,
                  }}
                  size="small"
                  avatar={<Avatar src={`/images/icons/${icon}`} />}
                />
              );
            })}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={
              selections.includes(option)
                ? { fontWeight: 700, backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                : undefined
            }
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function FilterComponent({
  handleFilters,
}: {
  handleFilters: (filters: Record<string, Array<string>>) => void;
}) {
  const numberOfFilters = 4;
  const filterGridWidth = 12 / numberOfFilters;

  const [filteredLanguages, setFilteredLanguages] = useState<string[]>([]);
  const [filteredFrameworks, setFilteredFrameworks] = useState<string[]>([]);
  const [filteredDatabases, setFilteredDatabases] = useState<string[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<string[]>([]);

  const languageNames = Object.keys(languages).map(
    (language) => languages[language as keyof typeof languages].name
  );

  const frameworkNames = Object.keys(frameworks).map(
    (framework) => frameworks[framework as keyof typeof frameworks].name
  );

  const databaseNames = Object.keys(databases).map(
    (database) => databases[database as keyof typeof databases].name
  );

  const platformNames = Object.keys(platforms).map(
    (platform) => platforms[platform as keyof typeof platforms].name
  );

  const handleLanguageSelection = (selections: Array<string>) => {
    setFilteredLanguages(selections);
    handleFilters({
      languages: selections,
      frameworks: filteredFrameworks,
      databases: filteredDatabases,
      platforms: filteredPlatforms,
    });
  };

  const handleFrameworkSelection = (selections: Array<string>) => {
    setFilteredFrameworks(selections);
    handleFilters({
      languages: filteredLanguages,
      frameworks: selections,
      databases: filteredDatabases,
      platforms: filteredPlatforms,
    });
  };

  const handleDatabaseSelection = (selections: Array<string>) => {
    setFilteredDatabases(selections);
    handleFilters({
      languages: filteredLanguages,
      frameworks: filteredFrameworks,
      databases: selections,
      platforms: filteredPlatforms,
    });
  };

  const handlePlatformSelection = (selections: Array<string>) => {
    setFilteredPlatforms(selections);
    handleFilters({
      languages: filteredLanguages,
      frameworks: filteredFrameworks,
      databases: filteredDatabases,
      platforms: selections,
    });
  };

  return (
    <Grid sx={{ flexGrow: 1 }} spacing={2} marginBottom={2} container flexDirection={'row'}>
      <Grid key="Languages" item xs={6} md={filterGridWidth}>
        <MultipleSelectChip
          label="Languages"
          options={languageNames}
          selections={filteredLanguages}
          onChange={handleLanguageSelection}
          customChipDetails={
            Object.keys(languages).reduce((acc, language) => {
              acc[language] = {
                key: language,
                option: languages[language as keyof typeof languages].name,
                color: languages[language as keyof typeof languages].color,
                label: languages[language as keyof typeof languages].abbreviation,
                icon: languages[language as keyof typeof languages].link,
              };
              return acc;
            }, {}) as Record<string, CustomChipDetails>
          }
        />
      </Grid>
      <Grid key="Frameworks" item xs={6} md={filterGridWidth}>
        <MultipleSelectChip
          label="Frameworks"
          options={frameworkNames}
          selections={filteredFrameworks}
          onChange={handleFrameworkSelection}
          customChipDetails={
            Object.keys(frameworks).reduce((acc, framework) => {
              acc[framework] = {
                key: framework,
                option: frameworks[framework as keyof typeof frameworks].name,
                color: frameworks[framework as keyof typeof frameworks].color,
                label: frameworks[framework as keyof typeof frameworks].abbreviation,
                icon: frameworks[framework as keyof typeof frameworks].link,
              };
              return acc;
            }, {}) as Record<string, CustomChipDetails>
          }
        />
      </Grid>
      <Grid key="Databases" item xs={6} md={filterGridWidth}>
        <MultipleSelectChip
          label="Databases"
          options={databaseNames}
          selections={filteredDatabases}
          onChange={handleDatabaseSelection}
          customChipDetails={
            Object.keys(databases).reduce((acc, database) => {
              acc[database] = {
                key: database,
                option: databases[database as keyof typeof databases].name,
                color: databases[database as keyof typeof databases].color,
                label: databases[database as keyof typeof databases].abbreviation,
                icon: databases[database as keyof typeof databases].link,
              };
              return acc;
            }, {}) as Record<string, CustomChipDetails>
          }
        />
      </Grid>
      <Grid key="Platforms" item xs={6} md={filterGridWidth}>
        <MultipleSelectChip
          label="Platforms"
          options={platformNames}
          selections={filteredPlatforms}
          onChange={handlePlatformSelection}
          customChipDetails={
            Object.keys(platforms).reduce((acc, platform) => {
              acc[platform] = {
                key: platform,
                option: platforms[platform as keyof typeof platforms].name,
                color: platforms[platform as keyof typeof platforms].color,
                label: platforms[platform as keyof typeof platforms].abbreviation,
                icon: platforms[platform as keyof typeof platforms].link,
              };
              return acc;
            }, {}) as Record<string, CustomChipDetails>
          }
        />
      </Grid>
    </Grid>
  );
}

function ResultCount({ count, max }: { count: number; max: number }) {
  return (
    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align="center" marginBottom={2}>
      {`${count !== max ? `${count} of ` : ''}${max} Projects`}
    </Typography>
  );
}

function CustomLayout({
  searchContainer,
  countContainer,
  resultContainer,
}: {
  searchContainer: React.ReactNode;
  countContainer: React.ReactNode;
  resultContainer: React.ReactNode;
}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        {searchContainer}
      </Grid>
      <Grid item xs={12}>
        {countContainer}
        {resultContainer}
      </Grid>
    </Grid>
  );
}
