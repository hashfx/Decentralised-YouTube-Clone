pragma solidity ^0.5.0;

/*
Create model of video
Store Video
Upload Video to IPFS
List Videos
*/

contract Dvdo {
    uint256 public videoCount = 0; // stores number of videos: initially 0
    string public name = "Dvdo"; // name of Smart Contract

    // store video in mapping
    mapping(uint256 => Video) public videos;

    // Create model of video
    struct Video {
        uint256 id; // unique id of video
        string hash; // hash of video: location at IPFS
        string title; // title of video
        address author; // Ethereum address of Video Author
    }

    // allows to know when the video was uploaded
    event videoUploaded(uint256 id, string hash, string title, address author);

    constructor() public {}

    // save video to blockchain
    function uploadVideo(string memory _videoHash, string memory _title)
        public
    {
        // important validation checks: if false, no code would execute
        require(bytes(_videoHash).length > 0); // video hash should exist

        require(bytes(_title).length > 0); // title must not be empty

        require(msg.sender != address(0)); // address must not be NULL or Empty

        // Increment video id
        videoCount = videoCount + 1; // increase total number of video by one

        // Add video to the contract
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender); // Video struct

        // Trigger an event
        emit videoUploaded(videoCount, _videoHash, _title, msg.sender);
    }
}
