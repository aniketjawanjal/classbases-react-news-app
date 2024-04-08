import React, { Component } from 'react'



export class NewsItem extends Component {

    

    constructor(props) {
        super(props)
        this.state = {
            showFullTitle: false,
            showFullDescription: false
        }
    }

    toggleTitleVisibelity = () => {
        this.setState(prevState => ({
            showFullTitle: !prevState.showFullTitle
        }))
    }
    toggleDescrpitionVisibelity = () => {
        this.setState(prevState => ({
            showFullDescription: !prevState.showFullDescription
        }))
    }

    render() {
        let { title, dicsription, imageUrl, newsUrl,author,date,source } = this.props;
        let {showFullTitle,showFullDescription}=this.state



        return (
            <>
                <div className='my-3'>
                    <div className="card">
                        <img src={!imageUrl ? 'https://cdn.vox-cdn.com/thumbor/iDfGkmDLIRjK4JkXVyRStrbq6D0=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23318435/akrales_220309_4977_0232.jpg' : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 onClick={this.toggleTitleVisibelity} className="card-title">  {showFullTitle ? title : `${title.slice(0, 45)}`} <span className="badge text-bg-secondary">{source}</span>
                            <button type="button" className="btn btn-link">{showFullTitle ? "Show less" : "Show more"}</button> </h5>
                            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <p onClick={this.toggleDescrpitionVisibelity} className="card-text">{showFullDescription ? dicsription : `${dicsription.slice(0, 88)}`}   
                           <button type="button" className="btn btn-link">{showFullDescription ? "Show less" : "Show more"}</button></p>
                            <a rel="noreferrer" href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default NewsItem
