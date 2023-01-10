import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultsProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0007bc4ec18c4a4380a59ddd7aa9a066&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);

    this.props.setProgress(30);
    this.setState({ loading: true });
    let parsedData = await data.json();

    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0007bc4ec18c4a4380a59ddd7aa9a066&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 style={{marginTop: "65px"}}>NewsMonkey - Top News Headlines</h2>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
