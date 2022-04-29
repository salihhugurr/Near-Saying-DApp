#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1

echo
echo 'About to call donate() on the contract'
echo near call $CONTRACT donate '{"id":'"$1"'}' --accountId $ACCOUNT
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT_OTHER is $ACCOUNT_OTHER
echo
near call $CONTRACT donate '{"id":'"$1"'}' --accountId $ACCOUNT