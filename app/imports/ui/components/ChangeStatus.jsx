import React from 'react'

import {
  create,
  search
} from '../../api/statuses/methods.js';


export default class ChangeStatus extends React.Component {

  constructor(props){
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }
  _handleSubmit(e){
    if (e && e.preventDefault) e.preventDefault()
    const {searchTerm} = this.refs;
    if (searchTerm.value) {
      Session.set('SEARCHING', true)
      search.call({searchTerm: searchTerm.value},(err,res)=>{
        if(err){
          console.log(err)
          Session.set('SEARCHING', false)
        } else {
          Session.set('SEARCH_RESULTS', res.data.data);
          Session.set('SEARCHING', false);
        }

      });
      searchTerm.value = '';
    }
    // create.call({imageUrl: this.refs.imageUrl.value})
    // this.refs.imageUrl.value = ''
  }

  _handleClick(resultObject){
    create.call({imageUrl: resultObject.images.downsized.url})
    Session.set('SEARCH_RESULTS', null);
  }
  render(){
    const {searching, searchResults} = this.props;
    return (
      <div>
        <form onSubmit={this._handleSubmit} >
          <input ref="searchTerm" />
          <button type="submit">Submit</button>
        </form>
        {(searchResults && searchResults.length > 0) ?
          <div>
            {searchResults.map(result=>(
              <img onClick={this._handleClick.bind(null, result)}
                   style={{display: 'inline-block'}}
                   key={result.id}
                   src={result.images.downsized.url}
                   width={result.images.downsized.width}
                   height={result.images.downsized.height}/>
            ))}
          </div> : null
        }
      </div>
    )
  }
}
