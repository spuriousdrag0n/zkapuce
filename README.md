# ZkPuce: A zkSync-based DEX

ZkPuce is a decentralized exchange (DEX) built on top of the zkSync Layer 2 scaling solution. It's inspired by Uniswap V2 and aims to provide low-cost, high-speed decentralized trading for ERC20 tokens.

## Features
Token Swapping: Users can swap between any two ERC20 tokens directly on our platform.
Liquidity Provision: Users can also provide liquidity to the token pairs and earn fees from trades.


# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn init -y`
`yarn add -D typescript ts-node ethers@^5.7.2 zksync-web3 hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy`


## Compile Contracts

`yarn hardhat compile`

## add you secret in .secret


## Run deploy

`yarn hardhat deploy-zksync`

