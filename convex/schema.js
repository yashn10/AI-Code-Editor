import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
    users: defineTable({
        uid: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
        credits: v.number(),
        // token: v.optional(v.number()),
    }),

    workspace: defineTable({
        messages: v.any(),
        Data: v.optional(v.any()),
        user: v.id('users'),
    }),

    wireframeToCode: defineTable({
        user: v.id('users'),
        imageURL: v.string(),
        model: v.string(),
        prompt: v.string(),
        Data: v.optional(v.any()),
    }),
})


export default schema;