// contract/assembly/index.ts
import { Saying } from "./model";
import {ContractPromiseBatch, u128} from "near-sdk-as";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(text: string): Saying {
  // use the Todo class to persist the todo data
  return Saying.insert(text);
}

export function get(id: u32): Saying {
  return Saying.findById(id);
}

export function upVote(id: u32): u32 {
  return Saying.upVote(id);
}

export function downVote(id: u32): u32 {
  return Saying.downVote(id);
}

export function del(id: u32): string {
  return Saying.deleteById(id);
}

export function donate(id: u32): ContractPromiseBatch {
  return Saying.donate(id);
}

export function getList(offset: u32, limit: u32): Saying[] {
  return Saying.find(offset,limit);
}