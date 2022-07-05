import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace">
        <br></br>
        &nbsp;
        <br></br>
        <div className="row">
          <div className="col-md-10">
            <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px' }}>

              <video
                // src={"https://ipfs.infura.io/ipfs/"+this.props.currentHash}
                src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                controls
              >
              </video>
            </div>
            <h3><b><i>{this.props.currentTitle}</i></b></h3>
          </div>
          <div className="col-md-2 overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
            <h5><b>Post Video</b></h5>
            <form onSubmit={(event) => {  // Submit Video
              event.preventDefault()
              const title = this.videoTitle.value  // video title
              this.props.uploadVideo(title)  // upload video
            }} >
              &nbsp;
              {/* Input Video*/}
              <input type="file" accept='.mp4, .mkv, .ogg, .wmv, .gif' onChange={this.props.captureFile} style={{ width: '250px' }} />
              <div className="form-group mr-sm-2">
                {/* Input video details*/}
                <input
                  id="videoTitle"
                  type="text"
                  className="form-control-sm"
                  placeholder="Video Title"
                  ref={(input) => { this.videoTitle = input }}
                  required />
              </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm">Upload</button>
              &nbsp;
            </form>
            {/* Map Video */}
            {this.props.videos.map((video, key) => {
              return (
                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px' }}>
                  <div className='card-title bg-dark'>
                    <small className="text-white"><b>{video.title}</b></small>
                  </div>
                  <div>
                    <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                      <video
                        src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                        style={{ width: '150px' }}
                      />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );

    
/*
    <div style={{ width: '175px' }}>
      <div className="card-title bg-dark">
        <small className="text-white"><b></b></small>
      </div>
      <div>
        
      </div>
    </div>
      // </div >
      // </div >
      //   </div >
      //   );
          */
  }
}

export default Main;