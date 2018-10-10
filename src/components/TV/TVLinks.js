import React from 'react';
import PropTypes from 'prop-types';
import * as css from './style';
import { cx } from 'react-emotion/macro';
import { Button, Input, Tooltip, Icon } from 'antd';
import { Toggle } from 'react-powerplug';
import posed from 'react-pose';

class TVLinks extends React.Component {
  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
    this.linkNameRef = React.createRef();
  }
  render() {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
  
    const onAddLink = (toggle) => {
      const linkDescription = this.linkNameRef.current.input.value;
      const link = this.linkRef.current.input.value;
      if (!link.length || !linkDescription.length) {
        return null;
      }
      const linkObj = { linkDescription, link };
      console.log('add link', this.props.showId, linkObj)
      this.props.addLinkToShow(this.props.showId, linkObj);
      toggle();
    }
    const onRemoveLink = (linkKey) => {
      this.props.removeLinkFromShow(this.props.showId, linkKey);
    }
    //
    const config = {
      visible: { opacity: 1, maxHeight: 100, transition: { duration: 1000 } },
      hidden: { opacity: 0, maxHeight: 0, transition: { duration: 500 } }
    }
  const Box = posed.div(config);
  
    return (
      <Toggle initial={this.props.linkToggle}>
        {({ on, toggle, set }) => {
            return (
              <div className={css.linkWrapper}>
                <Tooltip title="Add Link">
                  <Button 
                    className={css.linkAddButton}
                    onClick={() => {
                        toggle(); 
                        this.linkNameRef.current.focus();
                      }
                    } 
                    size="small" type="primary" 
                    icon={on ? "down-circle" : "right-circle"} 
                  />
                </Tooltip>
                {this.props.linksArray.map((linkObj) => {
                  return (
                    <div key={linkObj.linkKey} className={css.linkGroup}
                      
                    >
                      <a style={{ marginRight: "5px"}} href={linkObj.link} target="_blank">{linkObj.linkDescription}</a>
                      <Tooltip title={`Copy->${linkObj.link}`}><Icon type="copy" onClick={() => copyToClipboard(linkObj.link)} /></Tooltip>
                      <Button icon="minus" shape="circle" size="small"
                        type="danger"
                        onClick={() => onRemoveLink(linkObj.linkKey)} 
                      />
                    </div>
                  );
                  })
                }
  
                <Box
                  pose={on ? 'visible' : 'hidden'}
                  className={cx(css.linkAddWrapper, (!on ? css.displayNone : null))}
                  
                >
                  <Input style={{ width: "100px"}} autoFocus type="text" placeholder="Link Name" ref={this.linkNameRef}/>
                  <Input type="text" placeholder="Link url" ref={this.linkRef}/>
                  <Button icon="plus" onClick={() => onAddLink(toggle)} />
                </Box>
            </div>
            );
          }
        }
      </Toggle>
    );
  }
  
}

TVLinks.propTypes = {
  linksArray: PropTypes.array,
  showId: PropTypes.number,
  addLinkToShow: PropTypes.func,
  removeLinkFromShow: PropTypes.func,
};

export default TVLinks;

