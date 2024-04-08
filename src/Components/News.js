import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };


    constructor(props) {
        super(props);
        this.state = {
            articals: [],
            loading: false,
            page: 2,
            totalResults: 0
        }
        document.title = `${this.capitalizeLetter(this.props.category)}  News`
    }

    capitalizeLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async upadteNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articals: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);


    }

    async componentDidMount() {
        this.upadteNews();

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        // this.upadteNews();
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articals: this.state.articals.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }

    // handleNextClick = async () => {
    //     // console.log('next');
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({ loading: true })
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();


    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articals: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     this.setState({ page: this.state.page + 1 })

    //     this.upadteNews();

    // }

    // handlePreviousClick = async () => {
    //     // console.log('Previous');
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()

    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articals: parsedData.articles,
    //     //     loading: false
    //     // })

    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     this.upadteNews();
    // }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center' style={{ margin: "10px" }}>News - Top {this.capitalizeLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articals.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articals.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className='container'>
                        <div className='row'>
                            {this.state.articals.map((elements,index) => {
                                return <div className='col-md-4' key={`${elements.url}-${index}`}>
                                    <NewsItem title={elements.title || elements.title !== 'undefine' ? elements.title : ""} dicsription={elements.description ? elements.description : ""}
                                        imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name}></NewsItem>
                                </div>
                            })}
                        </div>
                        </div>
                        

                
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} type="button" className="btn btn-dark mb-5">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        onClick={this.handleNextClick} type="button" className="btn btn-dark mb-5">&rarr; Next</button>
                </div> */}
            </div>
        )
    }
}

export default News
