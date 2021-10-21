// https://github.com/agrcrobles/react-ethereum-metacoin

const ZettaToken = artifacts.require("ZettaToken");

contract('ZettaToken', (accounts) => {
	it('should put 10000 ZettaTokens in the first account', async () => {

    	const zettaTokenInstance = await ZettaToken.deployed();
    	const balance = await zettaTokenInstance.balanceOf.call(accounts[0]);

    	assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  	});
  	it('should call a function that depends on a linked library', async () => {
    	const zettaTokenInstance = await ZettaToken.deployed();
    	const zettaTokenBalance = (await zettaTokenInstance.balanceOf.call(accounts[0])).toNumber();
    	const zettaTokenEthBalance = (await zettaTokenInstance.getBalanceInEth.call(accounts[0])).toNumber();

    	assert.equal(zettaTokenEthBalance, 2 * zettaTokenBalance, 'Library function returned unexpected function, linkage may be broken');
  	});
  	it('should send coin correctly', async () => {
    	const zettaTokenInstance = await ZettaToken.deployed();

		// Setup 2 accounts.
		const accountOne = accounts[0];
		const accountTwo = accounts[1];

		// Get initial balances of first and second account.
		const accountOneStartingBalance = (await zettaTokenInstance.balanceOf.call(accountOne)).toNumber();
		const accountTwoStartingBalance = (await zettaTokenInstance.balanceOf.call(accountTwo)).toNumber();

		// Make transaction from first account to second.
		const amount = 10;
		await zettaTokenInstance.transfer(accountTwo, amount, { from: accountOne });

		// Get balances of first and second account after the transactions.
		const accountOneEndingBalance = (await zettaTokenInstance.balanceOf.call(accountOne)).toNumber();
		const accountTwoEndingBalance = (await zettaTokenInstance.balanceOf.call(accountTwo)).toNumber();

		assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
		assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
	});
});