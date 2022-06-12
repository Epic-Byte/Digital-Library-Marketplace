# LEBIUM Dapp
 
> ## Table of contents
- [Overview](#overview)
- [Project Features](#project-features)
- [Technologies](#technologies)
- [Repo Setup](#repo-setup)
- [Requirements](#requirements)
- [Setup the Project](#setup-the-project)
 - [Install Hardhat](#install-hardhat)
 - [Env Setup](#env-setup)
 - [Setup Hardhat.config](#setup-hardhatconfig)
- [Create the SmartContract](#create-the-smartcontract)
 - [Compile](#compile)
 - [Deploy](#deploy)
 - [Verify](#verify)
- [Setup the Frontend](#setup-the-frontend)
 - [Install Dependencies](#install-dependencies)
 - [Start Server](#start-server)
 - [Build the Frontend](#build-the-frontend)
- [Testing the Smartcontract](#testing-the-smartcontract)
- [DEES Contract Address](#DEES-contract-address)
- [Live Link](#live-link)
- [Contributors](#contributors)
- [Contributing to the project](#contributing-to-the-project)
#
> ## Overview
<p align="justify">
This is a project by Team Call-Byte presented for the chainlink spring 2022 hackathon.
</p>
 
<p align="justify">
This is a digital decentralized library marketplace that allows users to upload files, retrieve files in their private library, share files with other users from the service. It also allows users to put their files up for public sales and make money from it.
</p>
 
<p align="justify">
We have integrated the use of Chainlink Price Feed to help Lebium communicate with live changing prices of ETHUSD to accurately represent items up for public sale.
</p>

<P align="justify">
We wanted people to have a safe secure private and permanent place to store private digital items like files, secretes etc, we also wanted people to be able to make money of the digital items they wish to make public, hence the public library market.
</P>
 
#
> ## Project Features
 
- Upload files.
 
- Retrieve files.
 
- Share files to other users.
 
- Put files up for public sales.
 
- Buy items from users.
 
</p>
 
#
> ## Technologies
| <b><u>Stack</u></b> | <b><u>Usage</u></b> |
| :------------------ | :------------------ |
| **`Solidity`**      | Smart contract      |
| **`React JS`**      | Frontend            |
 
#
> ## Repo Setup
 
<p align="justify">
To setup the repo, fork Lebium repo, then clone the forked repository to create a copy on the local machine.
</p>
 
   $ git clone https://github.com/{GitHub-Username}/Digital-Library-Marketplace.git
 
<p align="justify">
Change directory to the cloned repo and set the original repository as the "upstream" and your forked repository as the "origin" using terminal.
</p>
 
   $ git remote add upstream https://github.com/Epic-Byte/Digital-Library-Marketplace.git
 
#
 
> ## Requirements
#
- Hardhat
- Alchemy key
- Metamask key
- Etherscan.io API Url
- Node JS
#
> ## Setup the Project
 
These are the steps involved in setting up this project
#
> ### Install Hardhat
The first step involves cloning and installing hardhat.
```shell
$ cd Digital-Library-Marketplace
 
$ npm i -D hardhat
 
$ npm install
 
$ npm install --save-dev "@nomiclabs/hardhat-waffle" "ethereum-waffle" "chai" "@nomiclabs/hardhat-ethers" "ethers" "web3" "@nomiclabs/hardhat-web3" "@nomiclabs/hardhat-etherscan" "@openzeppelin/contracts" "dotenv"
 
# If you encounter errors installing the dependencies above, delete the old package-lock.json and run the `npm install --save-dev` command again
```
> ### Env Setup
Next create a `.env` file by using the sample.env. Retrieve your information from the relevant sites and input the information where needed in the `.env` file.
 
`To retrieve your metamask private key.`
- Open your account details by clicking on the three dots on the metamask extension on your chrome browser
- Click on export private key
- Verify your password
- Copy your private key and place it in the .env file
 
<p align="center" width="100%">
 <img src="https://drive.google.com/uc?export=view&id=1oDl0IbicD7LhNOcYUbGzBYTJdduWim1t" alt="metamask"/>
</p>
 
#
`To retrieve your alchemy key.`
- Login to your account on https://www.alchemy.com/
- Once youre redirected to your [dashboard](https://dashboard.alchemyapi.io/), click on create app.
- Fill in the relevant details especially the chain and network
- Once the app has been created, click on view key.
- Copy the HTTP and place it in the .env file.
 
<p align="center" width="100%">
 <img src="https://drive.google.com/uc?export=view&id=1vPvT5LJRJy6B8hSi_3mPo16wC4u6MnEK" alt="alchemy"/>
</p>
 
#
`To retrieve your etherscan key.`
- Login to [etherscan](https://etherscan.io/) and hover over the dropdown arrow for your profile on the navbar.
- Click on API keys and add to create a new project (optional step).
- Once the project has been created, click on the copy button to copy the API key.
- Paste it in the .env file
 
<p align="center" width="100%">
 <img src="https://drive.google.com/uc?id=1pK3MVdVpf5uvrXAsosEADVtK7SqynvwR" alt="etherscan key"/>
</p>
 
#
> ### Setup Hardhat.config
 
 
Below is the setup for the hardhat.config.json
 
<p align="center" width="100%">
 <img src="https://drive.google.com/uc?export=view&id=1Wmc2o2DnF5K6Q5y0CTCjVUfUIoLVm2ei" alt="hardhat"/>
</p>
 
#
> ## Create the SmartContract
 - First write the Smartcontract codes within the contracts folder.
 - The next step involves the compilation, deployment and verification of the contract on the testnet.
 
> ### Compile
- To compile the smartcontract before deployment:
```
$ npx hardhat compile
```
#
> ### Deploy
- To deploy the smartcontract:
```
$ npx hardhat run packages/hardhat/deploy/01_Library.js --network rinkeby
```
#
> ### Verify
- To verify the smartcontract:
```
$ npx hardhat verify 0xcdb25aa30af6bbe029e8348cad9a0d37293c0c85 --network rinkeby
```
 
#
> ## Setup the Frontend
- First run the frontend on your local server to ensure it's fully functional before building for production.
#
> ### Install Dependencies
- Setup and install dependencies
 
```shell
$ cd react-app
 
$ npm install
 
$ npm install react-scripts@latest
```
#
> ### Start Server
- Start the server on localhost
```
$ npm run start
```
#
> ### Build the Frontend
- Create an optimized production build, which can be hosted on sites like Heroku, Netlify, Surge etc.
```
$ npm run build
```
 
#
> ## Contract Address
 
- https://rinkeby.etherscan.io/address/0xcdb25aa30af6bbe029e8348cad9a0d37293c0c85#code
 
# 
> ## Live Link
  - http://lebium-beta.surge.sh/
#
 
> ## Contributors
 
This Project was created by the members of Call Byte during the 2022 Chainlink Spring Hackathon.
 
GitHub Usernames
- GbolahanAnon
- Godhanded
- Bori7
- kingzamzon
- frankudoags
 
#
> ## Contributing to the project
 
If you find something worth contributing, please fork the repo, make a pull request and add valid and well-reasoned explanations about your changes or comments.
 
Before adding a pull request, please note:
 
- Your contributions should be inviting and clear.
- Any addition should be relevant.
- New features should be easy to contribute to.
 
All **`suggestions`** are welcome!
#
> ###### README Created by `GbolahanAnon` for Call Byte
 

