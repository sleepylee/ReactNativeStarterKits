import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Text } from 'native-base';
import * as Progress from 'react-native-progress';
import * as commonActions from '~/store/actions/common';
import * as authActions from '~/store/actions/auth';
import * as authSelectors from '~/store/selectors/auth';

@connect(
  state => ({
    ...authSelectors.getUser(state)
  }),
  {
    ...commonActions,
    ...authActions
  }
)
class Home extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Text
                onPress={() => this.props.app.props.openBrowser('https://github.com/agiletechvn/')}
              >
                agiletechvn
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem cardBody style={{ flexDirection: 'column' }}>
              <Progress.Bar progress={0.3} width={200} />
              <Progress.Pie progress={0.4} size={50} />
              <Progress.Circle size={30} indeterminate />
              <Progress.CircleSnail color={['red', 'green', 'blue']} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Home;
