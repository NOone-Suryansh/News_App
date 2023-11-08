import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";


import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title =
      this.props.category.slice(0, 1).toUpperCase() +
      this.props.category.slice(1) +
      "-NewsMonkey";
  }
  
  async updatenews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7770d42f0c4744b1a464545d20eb6e4b&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parseData= await data.json();
    //   this.setState({articles:parseData.articles,totalResults:parseData.totalResults,loading:false})
    this.updatenews();
  }

  // handlePrevClick = async () => {
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7770d42f0c4744b1a464545d20eb6e4b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data= await fetch(url);
  //   // let parseData= await data.json();

  //   // this.setState({
  //   //   page: this.state.page-1,
  //   //   articles:parseData.articles,
  //   //   loading:false
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updatenews();
  // };
  // handleNextClick = async () => {
  //   //   if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
  //   //   this.setState({loading:true});
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7770d42f0c4744b1a464545d20eb6e4b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   //   let data= await fetch(url);
  //   //   let parseData= await data.json();

  //   //   this.setState({
  //   //     page: this.state.page+1,
  //   //     articles:parseData.articles,
  //   //     loading:false
  //   //   })
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updatenews();
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7770d42f0c4744b1a464545d20eb6e4b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),

      totalResults: parseData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center" style={{'margin-top':'55px'}}>
          NewsMonkey - Top{" "}
          {this.props.category.slice(0, 1).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          style={{ overflow: "hidden" }}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 15) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage != null
                          ? element.urlToImage
                          : "https://im.rediff.com/news/2020/sep/14parlimanet-building.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
