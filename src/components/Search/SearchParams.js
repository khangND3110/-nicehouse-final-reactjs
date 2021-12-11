// default data for filter elements
export const priceInit = {
  0: '$0',
  100: '$100',
};

export const calenderItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

export const getAmenities = {
  id: 1,
  name: 'Amenities',
  identifier: 'amenities',
  options: [
    { label: 'Air Conditioning', value: 'airCondition' },
    { label: 'Free Parking', value: 'parking' },
    { label: 'Pool', value: 'pool' },
    { label: 'Free Wi-Fi', value: 'wifiAvailability' },
    
  ],
};

export const getDistrict = {
  id: 2,
  name: 'District',
  identifier: 'district',
  options: [
    { label: 'Bình Thạnh', value: 'Bình Thạnh' },
    { label: 'District 1', value: 'Quận 1' },
    { label: 'District 2', value: 'Quận 2' },
    { label: 'District 3', value: 'Quận 3' },
    { label: 'District 5', value: 'Quận 5' },
    { label: 'Gò Vấp', value: 'Gò Vấp' },
  ],
};
