import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
    users: defineTable({
        uid: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
    }),

    workspace: defineTable({
        messages: v.any(),
        Data: v.optional(v.any()),
        user: v.id('users'),
    }),
})


export default schema;