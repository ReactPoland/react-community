import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BestPracticesPreview.scss';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
// import { RichTextEditor } from 'components';
import Paper from 'material-ui/Paper';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const bestPractices = [
  {
    id: 0,
    name: 'Starting your React project',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 1,
    name: 'Handling async data',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 2,
    name: 'Inline styles vs CSS',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 3,
    name: 'UI Framework',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 4,
    name: 'State vs Props',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 5,
    name: 'Multiple layouts',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 6,
    name: 'API data store format',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 7,
    name: 'Modal views',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 8,
    name: 'Notifications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 9,
    name: 'Data immutability in Redux',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
  {
    id: 10,
    name: 'How to handle different user roles',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur obcaecati est odio veniam, dolorem vitae, facere ipsum fugiat recusandae architecto quam, repudiandae quae quia non nostrum magni maiores vero iusto aperiam animi ea! Nihil vitae nemo maiores a modi exercitationem repellendus dolorum in magnam. Deleniti, ullam, illo. Numquam, dolores, cupiditate? Temporibus error, voluptate doloribus sed, repellendus, tenetur voluptatum est, earum fuga ut exercitationem ipsam iusto dolor doloremque possimus. Libero voluptate sed veniam assumenda quod perspiciatis voluptatem eligendi esse ipsum qui doloribus excepturi eveniet harum debitis, ut! Quos quia dolorem, officiis! Esse hic perspiciatis cum doloremque, sapiente aperiam incidunt est quisquam rem labore magnam ipsa, aliquid quis, inventore nisi iusto similique? In perferendis cupiditate, earum modi iusto deserunt dolore ullam porro?'
  },
];

export default class BestPracticesPreview extends Component {
  static propTypes = {
    params: PropTypes.object,
    editingMode: PropTypes.bool
  }
  // state = {
  //   editingMode: false,
  // }
  // renderContentEditor = (bestPractice) => (
  //   <RichTextEditor
  //     initialState={bestPractice.content}
  //     readOnly={!this.state.editingMode}
  //     style={{ width: '100%', fontSize: 20 }}
  //   />
  // )
  // renderSaveEditButton = () => {
  //   return (
  //     <FlatButton
  //       style={{ margin: 0 }}
  //       label={this.props.editingMode ? 'Save' : 'Edit'}
  //       primary
  //       onTouchTap={ () => this.setState({ editingMode: !this.state.editingMode })}
  //     />
  //   );
  // }
  render() {
    const bestPractice = bestPractices.find((practice) => {
      if (`${practice.id}` === this.props.params.id) return practice;
    });
    return (
      <Grid className={styles.BestPracticesPreview}>
        <Row className={styles['BestPracticesPreview-center-content']}>
          <Col sm={12} md={8} lg={8}>
            <Paper zDepth={1}>
              <Toolbar>
                <ToolbarTitle text={bestPractice.name}/>
                <ToolbarGroup>
                  <FlatButton style={{ margin: 0 }} label={this.props.editingMode ? 'Save' : 'Edit'} primary/>
                  <FlatButton style={{ margin: 0 }} secondary label="Discussion" />
                </ToolbarGroup>
              </Toolbar>
              <div className={styles['BestPracticesPreview-content']}>
                {/* {this.renderContentEditor(bestPractice)} */}
                {bestPractice.content}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
