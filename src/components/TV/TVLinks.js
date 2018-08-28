import React from 'react';
import PropTypes from 'prop-types';
import * as css from './style';
import { Button, Input, Tooltip, Icon } from 'antd';
import { Toggle } from 'react-powerplug';
import posed from 'react-pose';

const TVLinks = (props) => {
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const onAddLink = (toggle) => {
    const linkDescription = this.linkNameRef.input.value;
    const link = this.linkRef.input.value;
    if (!link.length || !linkDescription.length) {
      return null;
    }
    const linkObj = { linkDescription, link };
    console.log('add link', props.showId, linkObj)
    props.addLinkToShow(props.showId, linkObj);
    toggle();
  }
  const onRemoveLink = (linkKey) => {
    props.removeLinkFromShow(props.showId, linkKey);
  }
  //
  const config = {
    visible: { opacity: 1, maxHeight: 100, transition: { duration: 1000 } },
    hidden: { opacity: 0, maxHeight: 0, transition: { duration: 500 } }
  }
const Box = posed.div(config);

  return (
    <Toggle initial={props.linkToggle}>
      {({ on, toggle, set }) => {
          return (
            <div className={css.linkWrapper}>
              <Tooltip title="Add Link">
                <Button 
                  className={css.linkAddButton}
                  onClick={() => {
                      toggle(); 
                      this.linkNameRef.focus();
                    }
                  } 
                  size="small" type="primary" 
                  icon={on ? "down-circle" : "right-circle"} 
                />
              </Tooltip>
              {props.linksArray.map((linkObj) => {
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
                className={css.linkAddWrapper}
              >
                <Input style={{ width: "100px"}} autoFocus type="text" placeholder="Link Name" ref={(input) => this.linkNameRef = input}/>
                <Input type="text" placeholder="Link url" ref={(input) => this.linkRef = input}/>
                <Button icon="plus" onClick={() => onAddLink(toggle)} />
              </Box>
          </div>
          );
        }
      }
    </Toggle>
    
  );
};

TVLinks.propTypes = {
  linksArray: PropTypes.array,
  showId: PropTypes.number,
  addLinkToShow: PropTypes.func,
  removeLinkFromShow: PropTypes.func,
};

export default TVLinks;

