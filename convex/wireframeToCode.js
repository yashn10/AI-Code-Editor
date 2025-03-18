const { v } = require("convex/values");
const { mutation, query } = require("./_generated/server");


export const CreateWireframeToCode = mutation({
    args: {
        user: v.id('users'),
        imageURL: v.string(),
        model: v.string(),
        prompt: v.string(),
    },
    handler: async (ctx, { user, imageURL, model, prompt }) => {
        const data = await ctx.db.insert("wireframeToCode", {
            user,
            imageURL,
            model,
            prompt,
            Data: null,
        });
        return data;
    },
});


export const GetWireframeToCode = query({
    args: {
        _id: v.id('wireframeToCode'),
    },
    handler: async (ctx, { _id }) => {
        const data = await ctx.db.get(_id);
        return data;
    },
});


export const GetWireframeToCodeByUser = query({
    args: {
        user: v.id('users'),
    },
    handler: async (ctx, { user }) => {
        const data = await ctx.db.query("wireframeToCode").filter(q => q.eq(q.field("user"), user)).collect();
        return data;
    },
});


export const UpdateWireframeToCode = mutation({
    args: {
        _id: v.id('wireframeToCode'),
        Data: v.any(),
    },
    handler: async (ctx, { _id, Data }) => {
        const data = await ctx.db.patch(_id, {
            Data,
        });
        return data;
    },
});


export const DeleteWireframeToCode = mutation({
    args: {
        _id: v.id('wireframeToCode'),
    },
    handler: async (ctx, { _id }) => {
        const data = await ctx.db.delete("wireframeToCode", _id);
        return data;
    },
});