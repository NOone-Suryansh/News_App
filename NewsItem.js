import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text my-1"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_black" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
