import React, {useEffect, useState} from 'react';
import SectionGrid from 'components/SectionGrid/ListingSectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import useDataApi from 'library/hooks/useDataApi';
import { SINGLE_POST_PAGE } from 'settings/constant';
import { getApartmentsOwner } from 'services/apartmentService';

const AgentItemLists = () => {
  const [apartments, setApartments] = useState([]);

  const { data, loadMoreData, loading, total } = useDataApi('/data/agent.json');
  const listed_post = data[0] && data[0].listed_post ? data[0].listed_post : [];

  const fetchApartments = async () => {
    const token = localStorage.getItem("accessToken");
    const reponse = await getApartmentsOwner(token);
    const json = await reponse.json();
    console.log(json.data);
    setApartments(json.data);
  }

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <SectionGrid
      link={SINGLE_POST_PAGE}
      data={apartments}
      loading={loading}
      limit={8}
      totalItem={total.length}
      columnWidth={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6]}
      placeholder={<PostPlaceholder />}
      handleLoadMore={loadMoreData}
    />
  );
};

export default AgentItemLists;
