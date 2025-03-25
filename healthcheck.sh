#!/usr/bin/env bash
set -e

echo "1) Hardhat version check..."
npx hardhat --version

echo "2) TypeScript validity..."
npx tsc --noEmit

echo "3) Solidity compile..."
npx hardhat compile

echo "4) Test suite without compile..."
npx hardhat test --no-compile

echo "5) Dependencies check..."
npm ls --depth=1

echo "Health check complete."