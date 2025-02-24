const { v } = require("convex/values");
const { mutation, query } = require("./_generated/server");

export const CreateUser = mutation({
    args: {
        uid: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
    },

    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter((user) => user.eq(user.field('email'), args.email)).collect();
        console.log(user);

        if (user.length === 0) {
            const newUser = await ctx.db.insert('users', {
                uid: args.uid,
                name: args.name,
                email: args.email,
                image: args.image,
                token: 50000
            });

            console.log(newUser);
        }
    }
})

export const GetUser = query({
    args: {
        email: v.string(),
    },

    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter((user) => user.eq(user.field('email'), args.email)).collect();
        // console.log(user);
        return user[0];
    }
})

export const updateToken = mutation({
    args: {
        token: v.number(),
        _id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            token: args.token
        });
        return result;
    }
})