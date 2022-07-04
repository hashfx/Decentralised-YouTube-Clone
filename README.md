## Decentralised Video Sharing Platform

#### Install Software and Dependencies

##### Install NodeJS and Ganache

[Node JS](https://nodejs.org/en/download/) <br />
[Ganache](https://trufflesuite.com/ganache/index.html)



##### 1. Install Truffle
```bash
npm install -g truffle
```


##### 2. Clone the Repository
```bash
git clone https://github.com/hashfx/Decentralised-YouTube-Clone.git
```

##### 3. Install node modules
```bash
npm install  # cd to cloned repo
```

##### 4. Deploy contract to Ganache Blockchain
```bash
truffle migrate --reset  # make sure Ganache is running in background
```

##### 5. Run Frontend Script
```bash
npm run dev
```

##### To Communicate with Smart Contract from Console
```bash
truffle console
dvideo = await Dvdo.deployed()  # returns undefined
dvideo  # displays JS version of Smart Contract
name = await Dvdo.name()  # returns undefined
name  # displays name of Smart Contract
```

##### 6. GoTo: `localhost:3000` OR `http://192.168.8.100:3000`

### 🔧 Project Diagram:
![Project Diagram](https://user-images.githubusercontent.com/69109482/177138187-aba2a59a-1bfc-4c89-98b3-1f844599dc5c.png)
Image Credits: [Dapp University](https://github.com/dappuniversity/)

### Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT License](https://github.com/hashfx/Decentralised-YouTube-Clone/blob/main/LICENSE)

<hr>

<h2 align="center">
Thanks for Visiting the <a href="https://github.com/hashfx">Profile</a> and Repository of <a href="https://github.com/hashfx/Decentralised-YouTube-Clone/">Decentralised Video Sharing Platform</a> 😊

