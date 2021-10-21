const MyStringStore = artifacts.require("MyStringStore");

const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const ZettaToken = artifacts.require('ZettaToken');

module.exports = function (deployer) {
    deployer.deploy(MyStringStore);

    // https://ethereum.stackexchange.com/questions/17558/what-does-deploy-link-exactly-do-in-truffle
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);
    
    deployer.link(ConvertLib, ZettaToken);
	deployer.deploy(ZettaToken);
};

