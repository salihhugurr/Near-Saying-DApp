#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1

echo
echo 'About to call create() on the contract'
echo near call \$CONTRACT create '{"sayingText":"$1"}' --account_id \$ACCOUNT
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT2 is $ACCOUNT
echo \$1 is [ $1 ] '(the saying)'
echo
near call $CONTRACT create '{"sayingText":"'"$1"'"}' --account_id $ACCOUNT