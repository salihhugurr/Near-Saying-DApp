
# Saying DApp

A new generation web3 blog application.You can share your sayings to people all around the world.And get in touch with them.


[![Near Saying DApp](https://www.loom.com/share/6ec60305d2904dbc94018c728802b9df)](https://www.loom.com/share/6ec60305d2904dbc94018c728802b9df)



# Cloning the project
After cloning the project please run 

    yarn
in order to install all of the necessary packages for the project to run correctly.

## Building and Deploying the contract
The contract is located in under the ***assembly*** folder, after editing the contract you can run

    yarn build:release
in order to build the contract and get the ***.wasm*** file , if you want to build and deploy the contract at the same time, you can run 

    yarn dev
This will create a test account and deploy the contract into it.

after the contract is deployed, it is necessary to run the following command in the terminal in order to be able to run the contract

    export CONTRACT=ACCOUNT_ID
where the **ACCOUNT_ID** will be returned after the contract deployment

# Functions
## create 

 - Take a ***text*** parameter
 - returns saying.

**Example call:**
`near call $CONTRACT create '{"text":"$Saying_TEXT"}' --accountId $NEAR_ACCOUNT`


## del

 - Takes ***id*** as a parameter
 - Can call if you are the creator of this saying.
 - Returns string `${id} is successfully deleted` or if it's not your saying `${id} is not your saying.Can not delete.`.

**Example call:**
`near call $CONTRACT del '{"id": '$id'}' --accountId $NEAR_ACCOUNT`

## getList 

 - Takes ***offset*** and ***limit*** as parameters
 - Returns an array between offset and limit.
 
**Example call:**
`near view $CONTRACT getList '{"offset":0 , "limit":10 }' --accountId $NEAR_ACCOUNT`

## upVote 

 - Takes ***id*** as  a parameters
 - Returns the score of saying that you want to upVote. But if it's yours you will get an error message like `${id} is your saying.Can not vote`

 **Example call:**
`near call $CONTRACT upVote '{"id":$ID }' --accountId $NEAR_ACCOUNT`
 
## downVote 
 - Takes ***id*** as  a parameters
 - Returns the score of saying that you want to downVote. But if it's yours you will get an error message like `${id} is your saying.Can not vote`

 **Example call:**
`near call $CONTRACT downVote '{"id":$ID }' --accountId $NEAR_ACCOUNT`
 
## get 
 - Takes ***id*** as  a parameters
 - Returns a saying element

**Example call:** 
`near view $CONTRACT get '{"id":$ID }' --accountId $NEAR_ACCOUNT`

## donate 
 - Takes ***id*** as  a parameter.
 - Returns transaction link.

**Example call:**

`near call $CONTRACT donate '{"id":$ID}' --accountId $NEAR_ACCOUNT`
