import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: 0,
            }}>
            <span className=" badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img style={{height:"200px"}}
            src={
              !imageUrl
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLgUYZv9pb1z3QHmveMlqSvehqZYVrwZf0ErD2RgkyJQ&s"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title"> {title.slice(0,50)}...</h5>
            <p className="card-text">{description.slice(0,150)}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
