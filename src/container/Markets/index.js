import { unionBy } from 'lodash';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Container, Text } from 'native-base';
import material from '~/theme/variables/material';
import { formatMarketCapVolumn, formatPrice } from '~/utils/common';

export default class extends React.Component {
  state = { loading: false, hasMore: true, paginate: 20, start: 0, data: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const { paginate, loading, start, hasMore } = this.state;
      if (loading || !hasMore) {
        return;
      }
      this.setState({ loading: true });
      /* eslint-disable */
      let response = await fetch(
        `https://api.coinmarketcap.com/v1/ticker/?convert=USD&start=${start}&limit=${paginate}`
      );
      response = await response.json();
      if (response.error) {
        this.setState({ hasMore: false, loading: false });
        return;
      }
      this.setState(prev => ({
        hasMore: true,
        loading: false,
        data: unionBy(prev.data, response, 'id')
      }));
      /* eslint-enable */
    } catch (e) {
      console.log(e);
    }
  };

  // shouldComponentUpdate(nextProps, { data }) {
  //   return this.state.data !== data;
  // }

  renderItem = ({ item, index }) => {
    const decrease = item.percent_change_1h.indexOf('-') > -1;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10
        }}
      >
        <View style={{ width: material.deviceWidth * 0.3 }}>
          <Text style={{ color: '#fff' }}>{`${item.symbol} / BTC`}</Text>
          <Text style={{ color: '#838383', fontSize: 12 }}>{`Cap ${formatMarketCapVolumn(
            item.market_cap_usd
          )}`}</Text>
        </View>
        <View style={{ width: material.deviceWidth * 0.3 }}>
          <Text style={{ color: decrease ? '#fff' : '#75A61E' }}>{`${item.price_btc}`}</Text>
          <Text style={{ color: '#838383', fontSize: 12 }}>{formatPrice(item.price_usd)}</Text>
        </View>
        <View
          style={{
            width: material.deviceWidth * 0.3,
            height: 30,
            backgroundColor: decrease ? '#90124F' : '#4F6E17',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3
          }}
        >
          <Text style={{ color: '#fff' }}>{`${item.percent_change_1h}`}</Text>
        </View>
      </View>
    );
  };

  render() {
    console.log('render');
    const { data } = this.state;
    return (
      <Container style={{ backgroundColor: '#151A1D' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1B2126',
            padding: 10
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Pair / Vol</Text>
          <Text style={{ color: '#fff', fontSize: 12 }}>Last Price</Text>
          <Text style={{ color: '#E3B02B', fontSize: 12 }}>Change %</Text>
        </View>
        <FlatList
          contentContainerStyle={{
            backgroundColor: '#151A1D'
          }}
          data={data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: 5, backgroundColor: 'transparent' }} />
          )}
        />
      </Container>
    );
  }
}
