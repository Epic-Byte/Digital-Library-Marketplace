//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Library
{

    AggregatorV3Interface internal priceFeed;
    /*
    *@notice Instance of Library Item
    */
    struct content
    {
        uint256 ID;
        string name;
        string Link;
        string description;
        string category;
        address seller;
        uint256 price;

    }

    /*
    *@notice Id counter 
    */
    uint256 public count = 0;
    uint256 public Pcount = 0;


    address private Owner;

    /*
    *@notice maps user to their library
    */
    mapping (address=>mapping(uint256=>content)) userLib;
    mapping (address=>content[])privlib;

    /**
    @notice Events to log public library
    */
    event PublicUpload(string _name, string _Link, string _description, string _category, uint256 price);
    event Share(address _sharer, string _filename, address _to);
    event bought(address _seller, address _buyer, string _name, uint256 _price);


    error incorrect_ether();
    error not_owner();
    

    /*
    *@notice array of public library items
    */
    content[] public publicLib;

    /**
     * Network: Rinkeby
     * Aggregator: ETH/USD
     * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
     */
    constructor(address _owner)
    {
        Owner= _owner;
        priceFeed =  AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }

    /*
    *@notice uploads privately to users library
    *@param _name file name
    *@param _Link IPFS Link
    *@param _description file description
    *@param category file category
    */
    function PrivateUpload(string calldata _name, string calldata _link, string calldata _description, string calldata _category) external
    {
        count++;
        uint256 Count = count;
        userLib[msg.sender][count]=content(Count,_name, _link, _description, _category, msg.sender,0);
        privlib[msg.sender].push(content(Count,_name, _link,_description, _category, msg.sender,0));
    }

    /**
    @notice Uploads publicly into array publicLib
    @param _name file name
    @param _Link IPFS Link
    @param _description file description
    @param _category file category
    */
    function publicUpload(string calldata _name, string calldata _Link, string calldata _description, string calldata _category) external returns(string memory)
    {
        Pcount++;
        uint256 pcount = Pcount;
        content memory Content = content(pcount,_name, _Link, _description, _category, msg.sender,0);
        publicLib.push(Content);
        emit PublicUpload(_name, _Link, _description, _category, 0);
         return ("Added to Public Library");
    }


    /**
    @notice shares item in library
    @param _to recieve addresses
    @param _ID of file
    */
    function share(address[] calldata _to, uint256 _ID) external returns(string memory)
    {
         content memory c = userLib[msg.sender][_ID];
        uint256 length= _to.length;
        for(uint256 i=0; i< length; ) {
        require(_to[i] != address(0),"you cant share to zero address");
        
        userLib[_to[i]][_ID] = content(c.ID, c.name, c.Link, c.description, c.category, c.seller,c.price);
        privlib[_to[i]].push(content(c.ID,c.name, c.Link,c.description, c.category, c.seller,c.price));
        emit Share(msg.sender, c.name, _to[i]);
        unchecked {i++; }
        }
        return "shared";
    }


    /*
    *@notice view Library items
    */
    function viewPrivateLib() public view returns(content[] memory )
    {
        return privlib[msg.sender];
    }

    /*
    *@notice make private item public for sale
    @param _ID id of item to make public
    @param _price price of item
    */
    function publicSale(uint256 _ID, uint256 _price)external  //note this was our make public funtion
    {
        content memory c = userLib[msg.sender][_ID];
        publicLib.push(content(c.ID,c.name,c.Link,c.description, c.category, msg.sender, _price));
        emit PublicUpload(c.name, c.Link, c.description, c.category, _price);
    }

    /*
    *@notice buy an item from the public marketplace 
    *@param arrayID the position of the item in the public items array
    */
    function buyItem(uint256 _arrayID)external payable
    // guys we have to test this to ensure enough gas is calculated by metamask to also execute the transfer
    {
        content memory c= publicLib[_arrayID];
        uint feed = c.price / (getLatestPrice()*10**10);
        if(msg.value!=feed)
        {
            revert incorrect_ether();
        }
        userLib[msg.sender][c.ID]=content(c.ID,c.name,c.Link,c.description, c.category, c.seller,c.price);
        privlib[msg.sender].push(content(c.ID,c.name,c.Link,c.description, c.category, c.seller,c.price));
        emit bought(c.seller, msg.sender, c.name, c.price);
        payable(msg.sender).transfer((feed*95)/100);
    }

    /*
    *@notice front end gets ether value of an item for sale
    *@param arrayID the position of the item in the public items array
    */
    function assetPrice(uint256 _arrayID)external view returns(uint)
    //not yet working we have to look into this
    {
        content memory c= publicLib[_arrayID];
        uint feed = c.price / (getLatestPrice()*10**10);
        return feed;
    }

     /*
     *@notice Returns the latest price
     */
    function getLatestPrice() public view returns (uint) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return uint(price);
    }

     /*
     *@notice changes the owners address
     *@param addr new owner address
     */
    function changeOwner(address _addr)external
    {
        if(msg.sender!= Owner)
        {
            revert not_owner();
        }
        Owner= _addr;
    }

     /**
     *@notice Withdraws contract Revenue to owner
     */
    function withdraw()external
    {
        if(msg.sender!= Owner)
        {
            revert not_owner();
        }
        payable(msg.sender).transfer(address(this).balance);
    }
}
