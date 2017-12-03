import { unionBy } from 'lodash';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Container, Text } from 'native-base';
import Item from './Item';

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
          renderItem={({ item }) => <Item item={item} />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 5, backgroundColor: 'transparent' }} />
          )}
        />
      </Container>
    );
  }
}
