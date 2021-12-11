import React, { useState, Fragment, useEffect } from 'react';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import { Checkbox } from 'antd';
import CategorySearch from 'components/Search/CategorySearch/CategotySearch';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/ListingSectionGrid';
import ListingMap from './ListingMap';
import FilterDrawer from 'components/Search/MobileSearchView';
import useWindowSize from 'library/hooks/useWindowSize';
import { SINGLE_POST_PAGE } from 'settings/constant';
import ListingWrapper, { PostsWrapper, ShowMapCheckbox } from './Listing.style';
import { getApartments } from 'services/apartmentService';
import { getStateFromUrl } from 'library/helpers/url_handler';

export default function Listing({ location, history }) {
  const searchParams = getStateFromUrl(location);
  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  const [apartments, setApartments] = useState([]);
  let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];

  if (showMap) {
    columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 2, 1 / 3];
  }
  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };

  const currentAparments = [];

  const fetchApartments = async () => {
    const reponse = await getApartments();
    const json = await reponse.json();
    if (json.data != null) {
      json.data.forEach(i => {
        currentAparments.push(i);
      });
    }
    console.log(json.data);
    setApartments(currentAparments);
  }

  const filterApartment = (searchParams) => {
    let district = null;
    if (searchParams.district != null) {
      district = searchParams.district.split(',');
    }
    const apartmentsFilter = currentAparments.filter(item => {
      const isDistrict = district != null ? district.includes(item.location.district) : true;
      return isDistrict;
    });
    console.log('filter',apartmentsFilter);
    setApartments(apartmentsFilter);
  }

  useEffect(async () => {
    await fetchApartments();
    filterApartment(searchParams);
  }, [location, history]);

  return (
    <ListingWrapper>
      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
            width > 991 ? (
              <CategorySearch history={history} location={location} />
            ) : (
              <FilterDrawer history={history} location={location} />
            )
          }
          right={
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Show map
              </Checkbox>
            </ShowMapCheckbox>
          }
        />
      </Sticky>

      <Fragment>
        <PostsWrapper className={width > 767 && showMap ? 'col-12' : 'col-24'}>
          <SectionGrid
            link={SINGLE_POST_PAGE}
            columnWidth={columnWidth}
            data={apartments}
            totalItem={apartments.length}
            placeholder={<PostPlaceholder />}
          />
        </PostsWrapper>

        {showMap && <ListingMap data={apartments} />}
      </Fragment>
    </ListingWrapper>
  );
}
