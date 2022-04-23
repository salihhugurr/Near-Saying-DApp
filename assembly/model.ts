import { PersistentUnorderedMap, math, Context,u128,ContractPromiseBatch } from "near-sdk-as";


export const sayings = new PersistentUnorderedMap<u32, Saying>("sayings");

@nearBindgen

export class Saying {
    id:u32;
    score:u32;
    text:string;
    userId:string;
    donation:u32;

    constructor(text: string) {
        this.id = math.hash32<string>(text);
        this.text = text;
        this.score = 0;
        this.userId = Context.predecessor;
        this.donation = 0;
    }

    static insert(text:string):Saying {
        const saying = new Saying(text);

        sayings.set(saying.id,saying)

        return saying;
    }


    static findById(id: u32): Saying {
        // Lookup a todo in the PersistentUnorderedMap by its id.
        // This is like a SELECT * FROM todos WHERE id=?
        return sayings.getSome(id);
    }

    static deleteById(id: u32): string {
        // Lookup a todo in the PersistentUnorderedMap by its id.
        // This is like a SELECT * FROM todos WHERE id=?
        const saying = Saying.findById(id);
        assert(Context.predecessor == saying.userId, `${id} is not your saying.Can not delete.`);
        sayings.delete(id)
        return `${id} is successfully deleted`;
    }

    static donate(id: u32): ContractPromiseBatch {
        const saying = Saying.findById(id);
        const toRecipient = ContractPromiseBatch.create(saying.userId);
        const amount = u128.from('100000000000000000000000');
        assert(Context.attachedDeposit <= amount, `You do not have enough near to donate.`);
        saying.donation += 1;
        sayings.set(id,saying);
        return toRecipient.transfer(amount);
    }

    static upVote(id: u32): u32 {
        // Lookup a todo in the PersistentUnorderedMap by its id.
        // This is like a SELECT * FROM todos WHERE id=?
        const saying = Saying.findById(id);
        assert(Context.predecessor != saying.userId, `${id} is your saying.Can not vote`);
        saying.score +=1;
        sayings.set(id,saying);
        return saying.score;
    }

    static downVote(id: u32): u32 {
        // Lookup a todo in the PersistentUnorderedMap by its id.
        // This is like a SELECT * FROM todos WHERE id=?
        const saying = Saying.findById(id);
        assert(Context.predecessor != saying.userId, `${id} is your saying.Can not vote`);
        assert(saying.score > 0, `Score is already zero`);
        saying.score -=1;
        sayings.set(id,saying);
        return saying.score;
    }

    static find(offset: u32, limit: u32): Saying[] {
        // the PersistentUnorderedMap values method will
        // takes two parameters: start and end. we'll start
        // at the offset (skipping all todos before the offset)
        // and collect all todos until we reach the offset + limit
        // todo. For example, if offset is 10 and limit is 3 then
        // this would return the 10th, 11th, and 12th todo.
        return sayings.values(offset, offset + limit);
    }

}
