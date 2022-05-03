//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


contract Library
{
    /*
    *@notice Instance of Library Item
    */
    struct content
    {
        uint256 ID;
        string name;
        string Link;
        string description;
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
    event PublicUpload(string _name, string _Link, string _description, uint256 price);
    event Share(address sharer, string _filename, address _to);
    event bought(address seller, address buyer, string name, uint256 price);


    error incorrect_ether();
    error not_owner();
    

    /*
    *@notice array of public library items
    */
    content[] public publicLib;

    constructor(address _owner)
    {
        Owner= _owner;
    }

    /*
    *@notice uploads privately to users library
     @param _name file name
    @param _Link IPFS Link
    @param _description file description
    */
    function PrivateUpload(string calldata _name, string calldata _Link, string calldata _description) external
    {
        count++;
        uint256 Count = count;
        userLib[msg.sender][count]=content(Count,_name, _Link, _description, msg.sender,0);
        privlib[msg.sender].push(content(Count,_name, _Link,_description,msg.sender,0));
    }

    /**
    @notice Uploads publicly into array publicLib
    @param _name file name
    @param _Link IPFS Link
    @param _description file description
    */
    function publicUpload(string calldata _name, string calldata _Link, string calldata _description) external returns(string memory)
    {
        Pcount++;
        uint256 pcount = Pcount;
        content memory Content = content(pcount,_name, _Link, _description,msg.sender,0);
        publicLib.push(Content);
        emit PublicUpload(_name, _Link, _description,0);
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
        
        userLib[_to[i]][_ID] = content(c.ID, c.name, c.Link, c.description, c.seller,c.price);
        privlib[_to[i]].push(content(c.ID,c.name, c.Link,c.description,c.seller,c.price));
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
    @param price price of item
    */
    function publicSale(uint256 _ID, uint256 price)external  //note this was our make public funtion
    {
        content memory c = userLib[msg.sender][_ID];
        publicLib.push(content(c.ID,c.name,c.Link,c.description,msg.sender,price));
        emit PublicUpload(c.name, c.Link, c.description, price);
    }

    /*
    *@notice buy an item from the public marketplace 
    @param arrayID id of item in public library array
    */
    function buyItem(uint256 arrayID)external payable 
    // guys we have to test this to ensure enough gas is calculated by metamask to also execute he transfer
    {
        content memory c= publicLib[arrayID];
        if(msg.value!=c.price)
        {
            revert incorrect_ether();
        }
        userLib[msg.sender][c.ID]=content(c.ID,c.name,c.Link,c.description,c.seller,c.price);
        privlib[msg.sender].push(content(c.ID,c.name,c.Link,c.description,c.seller,c.price));
        emit bought(c.seller, msg.sender, c.name, c.price);
        payable(msg.sender).transfer((msg.value*95)/100);
    }

    function changeOwner(address addr)external
    {
        if(msg.sender!= Owner)
        {
            revert not_owner();
        }
        Owner= addr;
    }

    function withdraw()external
    {
        if(msg.sender!= Owner)
        {
            revert not_owner();
        }
        payable(msg.sender).transfer(address(this).balance);
    }
}
