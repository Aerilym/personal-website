import { Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

export default function Showcase({
  data,
  ItemComponent,
  ItemContainer,
  searchableKeys,
  filterableKeys,
  CustomLayout,
  CustomSearchComponent,
  CustomFiltersComponent,
  CustomResultCount,
}: {
  data: Array<Record<string, any>>;
  ItemComponent: React.FC<any>;
  ItemContainer: React.FC<any>;
  searchableKeys: Array<string>;
  filterableKeys: Array<string>;
  CustomLayout?: React.FC<any>;
  CustomSearchComponent?: React.FC<any>;
  CustomFiltersComponent?: React.FC<any>;
  CustomResultCount?: React.FC<any>;
}) {
  const router = useRouter();
  if (!searchableKeys || searchableKeys.length === 0) searchableKeys = [Object.keys(data[0])[0]];
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, Array<string>>>();

  const filteredData = useMemo(() => {
    let preliminaryData = data;

    // Handle filters
    // NOTE: This only works if the names and keys match when lower case
    if (
      filters &&
      filterableKeys &&
      Object.keys(filters).length > 0 &&
      Object.values(filters).some((v) => v.length > 0)
    ) {
      try {
        Object.keys(filters).forEach((filterKey) => {
          if (filters[filterKey].length > 0) {
            preliminaryData = preliminaryData.filter((item: Record<string, Array<string>>) => {
              return filters[filterKey].some((filterValue) => {
                try {
                  return item[filterKey]
                    .map((value) => value.toLowerCase())
                    .includes(filterValue.toLowerCase());
                } catch {
                  return false;
                }
              });
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    // Handle search: filter with all searchable keys using OR
    if (search) {
      try {
        preliminaryData = preliminaryData.filter((item) => {
          return searchableKeys.some((key) => {
            try {
              return item[key].toString().toLowerCase().includes(search.trim().toLowerCase());
            } catch {
              return false;
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    return preliminaryData;
  }, [data, search, searchableKeys, filters, filterableKeys]);

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleFilters = (newFilters: Record<string, Array<string>>) => {
    setFilters(newFilters);
  };

  const searchContainer = (
    <>
      {CustomSearchComponent ? (
        <CustomSearchComponent onChange={handleSearch} />
      ) : (
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
      {CustomFiltersComponent && <CustomFiltersComponent handleFilters={handleFilters} />}
    </>
  );

  const countContainer = (
    <>{CustomResultCount && <CustomResultCount count={filteredData.length} max={data.length} />}</>
  );

  const resultContainer = (
    <ItemContainer>
      {filteredData.map((item, index) => {
        return <ItemComponent key={index} {...{ item }} />;
      })}
    </ItemContainer>
  );

  return CustomLayout ? (
    <CustomLayout
      searchContainer={searchContainer}
      countContainer={countContainer}
      resultContainer={resultContainer}
    />
  ) : (
    <Grid>
      {searchContainer}
      {countContainer}
      {resultContainer}
    </Grid>
  );
}

{
  /* <Grid>
      {CustomSearchComponent ? (
        <CustomSearchComponent onChange={handleSearch} />
      ) : (
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleSearch}
        />
      )}
      {CustomFiltersComponent && <CustomFiltersComponent handleFilters={handleFilters} />}

      {CustomResultCount && <CustomResultCount count={filteredData.length} max={data.length} />}

      <ItemContainer>
        {filteredData.map((item, index) => {
          return <ItemComponent key={index} {...{ item }} />;
        })}
      </ItemContainer>
    </Grid> */
}
